const { Etcd3 } = require("etcd3");

const client = new Etcd3({
  hosts: "http://localhost:2379",
  auth: {
    username: "root",
    password: "zxp",
  },
});

(async () => {
  const services = await client.get("/service/a").string();
  console.log("service A:", services);

  const allServices = await client.getAll().prefix("/service").keys();
  console.log("all services:", allServices);

  const watcher = await client.watch().prefix("/service/a").create();

  watcher.on("put", (req) => {
    console.log("put:", req.value.toString());
  });

  watcher.on("delete", (req) => {
    console.log("delete:", req);
  });
})();

// 保存配置
async function saveConfig(key, value) {
  await client.put(key).value(value);
}

// 读取配置
async function readConfig(key) {
  return await client.get(key).string();
}

// 删除配置
async function deleteConfig(key) {
  await client.delete().key(key);
}

(async () => {
  await saveConfig("/config/a", "1");
  const config = await readConfig("/config/a");
  console.log("config:", config);
})();

// 服务注册
async function registerService(name, id, metadata) {
  const key = `/service/${name}/${id}`;
  const lease = client.lease(10); // 10s 过期
  await lease.put(key).value(JSON.stringify(metadata));
  lease.on("lost", async () => {
    console.log("租约过期，重新注册...");
    await registerService(name, id, metadata);
  });
}

// 服务发现
async function discoverService(name) {
  const instances = await client.getAll().prefix(`/service/${name}`).strings();
  return Object.entries(instances).map(([key, value]) => JSON.parse(value));
}

// 监听服务变化
async function watchService(name, cb) {
  const watcher = await client.watch().prefix(`/service/${name}`).create();
  watcher
    .on("put", async (event) => {
      console.log("新的服务节点添加:", event.key.toString());
      cb(await discoverService(name));
    })
    .on("delete", async (event) => {
      console.log("服务节点删除:", event.key.toString());
      // 返回现在的可用节点。
      cb(await discoverService(name));
    });
}

(async function () {
  const serviceName = "my-service";

  await registerService(serviceName, "1", { host: "localhost", port: 3000 });
  await registerService(serviceName, "2", { host: "localhost", port: 3001 });

  const instances = await discoverService(serviceName);
  console.log("instances:", instances);

  await watchService(serviceName, (updatedInstances) => {
    console.log("updatedInstances:", updatedInstances);
  });
})();

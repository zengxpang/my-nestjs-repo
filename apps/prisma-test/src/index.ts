import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
  ],
});

async function test1() {
  await prismaClient.user.create({
    data: {
      name: "zxp",
      email: "xxx@xx.com",
    },
  });

  await prismaClient.user.create({
    data: {
      name: "xun",
      email: "yyy@yy.com",
    },
  });

  const user = await prismaClient.user.findMany();
  console.log(user);
}

// test1().then((r) => {
//   console.log(r);
// });

async function test2() {
  const users = await prismaClient.user.create({
    data: {
      name: "小胖胖",
      email: "zzz@zz.com",
      posts: {
        create: [
          {
            title: "文章 a",
            content: "aaa",
          },
          {
            title: "文章 b",
            content: "bbb",
          },
        ],
      },
    },
  });

  console.log(users);
}
// test2();

async function test3() {
  await prismaClient.post.update({
    where: {
      id: 2,
    },
    data: {
      content: "xxx",
    },
  });
}
// test3();

async function test4() {
  await prismaClient.post.delete({
    where: {
      id: 2,
    },
  });
}

test4();

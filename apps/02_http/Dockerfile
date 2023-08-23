# build stage
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

#通过 COPY --from-build-stage 从上面那个镜像内复制 /app/dist 的文件到当前镜像的 /app 下
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

#  /app 目录执行 npm install --production 只安装 dependencies 依赖
WORKDIR /app

RUN npm install --production

EXPOSE 3000

# dist/main.js  dist里面的文件被放在了 app 下了
CMD ["node", "/app/main.js"]
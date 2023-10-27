import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
  ],
});

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "曾曾曾",
      email: "zengzeng@163.com",
      Post: {
        create: [
          {
            title: "Hello World",
            content: "Hello World",
          },
          {
            title: "Hello World 2",
            content: "Hello World 2",
          },
        ],
      },
    },
  });
  console.log(user);
}

main();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Vasya",
  //       email: "vasya@prisma.io",
  //     },
  //   });

  //   const post = await prisma.post.create({
  //     data: {
  //       title: "Im born",
  //       content: "toomorow",
  //       authorId: user.id,
  //     },
  //   });
  //   console.log(user);
  //   console.log(post);

  const users = await prisma.user.findMany({
    where: {
      name: "Alice",
      posts: {
        some: {
          title: "Im born",
        },
      },
    },
    include: {
      posts: true,
    },
  });

  console.log(users);

  const user = await prisma.user.findUnique({
    where: { email: "vasya@prisma.io" },
  });

  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

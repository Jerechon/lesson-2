const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async ({ name, email }) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  console.log(user);
  return user;
};

const createProduct = async ({ title, size, description, compound, price }) => {
  const product = await prisma.product.create({
    data: {
      title,
      size,
      description,
      compound,
      price,
    },
  });
  console.log(product);
  return product;
};

const createPurchase = async ({ userId, productId }) => {
  const purchase = await prisma.userProducts.create({
    data: {
      userId,
      productId,
    },
  });
  console.log(purchase);
  return purchase;
};

async function main() {
  // const user = await createUser({ name: "Vasya", email: "vasya@88date.co" });
  // const product = await createProduct({
  //   title: "Hoodie",
  //   size: "28",
  //   description: "Just Hoodie",
  //   compound: "100% Silk",
  //   price: "100$",
  // });
  // await createPurchase({ userId: user.id, productId: product.id });
  const users = await prisma.user.findMany({
    include: {
      shoppingList: {
        include: {
          product: true,
        },
      },
    },
  });
  console.log(users[2].shoppingList);
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

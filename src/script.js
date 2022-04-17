const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "Fullstack tutorial with guacamole",
      url: "www.google.com",
    },
  });
  const update = await prisma.link.update({
    where: {
      id: 1,
    },
    data: {
      description: "que que isso mia gente",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

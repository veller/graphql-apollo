function feed(parent, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  const links = context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = context.prisma.link.count({ where });

  return {
    links,
    count,
  };
}

function users(parent, args, context) {
  console.log(`to entrando aqui pelo meno?`);
  return context.prisma.user.findMany();
}

module.exports = {
  feed,
  users,
};

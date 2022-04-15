const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find((link) => link.id === args.id);
    },
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      const linkIdx = links.findIndex((link) => link.id === args.id);

      if (linkIdx < 0) return null;

      links[linkIdx] = {
        ...links[linkIdx],
        url: args.url,
        description: args.description,
      };

      return links[linkIdx];
    },
    deleteLink: (parent, args) => {
      links = links.filter((link) => link.id !== args.id);
      console.log(`links`, links);
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

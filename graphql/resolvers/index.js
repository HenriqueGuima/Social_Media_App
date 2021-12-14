const postsResolvers = require("./posts");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...postsResolvers.Query,
    // ...usersResolver.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};

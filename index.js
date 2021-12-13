const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

// const resolvers = {
//   Query: {
//     async getPosts() {
//       try {
//         const posts = await Post.find();
//         return posts;
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//     // getPosts: async () => {
//     //   const posts = await Post.find();
//     //   return posts;
//     // },
//   },
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log("Connected to MongoDB");
  server.listen({ port: 5000 }).then((res) => {
    console.log(`🚀 Server ready at ${res.url}`);
  });
});

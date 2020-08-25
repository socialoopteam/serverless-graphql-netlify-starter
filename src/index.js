
const { createLocalServer, dbConnect } = require("./server")

const server = createLocalServer();

server.listen().then(({ url }) => {
  dbConnect(
    "mongodb+srv://emmadal:sjk5jwizbxTldIwE@cluster0.fna4c.mongodb.net/songonpark?retryWrites=true&w=majority"
  );
  console.log(`🚀 Server ready at ${url}`);
});
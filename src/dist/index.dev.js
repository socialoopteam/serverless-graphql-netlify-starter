"use strict";

var _require = require("./server"),
    createLocalServer = _require.createLocalServer,
    dbConnect = _require.dbConnect;

var server = createLocalServer();
server.listen().then(function (_ref) {
  var url = _ref.url;
  dbConnect("mongodb+srv://emmadal:sjk5jwizbxTldIwE@cluster0.fna4c.mongodb.net/songonpark?retryWrites=true&w=majority");
  console.log("\uD83D\uDE80 Server ready at ".concat(url));
});
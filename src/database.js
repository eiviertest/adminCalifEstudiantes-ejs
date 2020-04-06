const mongoose = require("mongoose");
//Configuration of params to connection
//const { MongoAtlasConnection } = process.env;
const MONGODB_URI_ATLAS = `mongodb+srv://kapxyale:alex45eivier@herramientas-tdenp.mongodb.net/test?retryWrites=true&w=majority`;
//const MONGODB_URI_LOCAL = 'mongodb://localhost/students';

//Connection to MongoAtlas
mongoose
  .connect(MONGODB_URI_ATLAS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));

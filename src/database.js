const mongoose = require("mongoose");
//Configuration of params to connection
//const { MongoAtlasConnection } = process.env;
//const MONGODB_URI_ATLAS = `mongodb+srv://${MongoAtlasConnection}`;
const MONGODB_URI_LOCAL = 'mongodb://localhost/students';

//Connection to MongoAtlas
mongoose
  .connect(MONGODB_URI_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));

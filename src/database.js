//Get mongoose module
const mongoose = require("mongoose");
//Configuration of params to connection with MongoAtlas
const MONGODB_URI_ATLAS = `mongodb+srv://kapxyale:alex45eivier@herramientas-tdenp.mongodb.net/test?retryWrites=true&w=majority`;
//Configuration of params to connection with MongoDB (Localhost)
//const MONGODB_URI_LOCAL = 'mongodb://localhost/students';

//Promise to connect to MongoAtlas using mongoose
mongoose
  .connect(MONGODB_URI_ATLAS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  //Success
  .then((db) => console.log("Database is connected"))
  //Error
  .catch((err) => console.log(err));

const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "users",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      isConnected = true;
      console.log("Vous êtes connecté/e !", process.env.MONGODB_URI);
    } catch (e) {
      console.error(e);
    }
  }
};

module.exports = {
  connectToDB,
};

const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "users",
      });

      isConnected = true;
      console.log("Vous êtes connecté/e !");
    } catch (e) {
      console.error(e);
    }
  }
};

module.exports = {
  connectToDB,
};

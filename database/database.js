const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();

const uri = process.env.MONGODB_URL;

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialized!");
    return callback(null, database);
  }

  MongoClient.connect(uri)
    .then((client) => {
      database = client.db();
      console.log("Database Initialized");
      return callback(null, database);
    })
    .catch((err) => {
      console.log("Failed to connect to database", err);
      return callback(err);
    });
};

const getDb = () => {
  if (!database) {
    console.log("Database is not intialized. Call initDb first");
  }
  return database;
};

module.exports = {initDb, getDb};

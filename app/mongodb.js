// mongodb.js

import { MongoClient } from "mongodb";

let dbClient = null;

export const connectToDB = async () => {
  if (dbClient) {
    console.log("MongoDB is already connected");
    return dbClient;
  }

  try {
    dbClient = await MongoClient.connect(process.env.MongoDbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
    return dbClient;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const insertUser = async (userData) => {
  const client = await connectToDB();
  const db = client.db("DashboardNext");
  const collection = db.collection("DashboardNext");

  const result = await collection.insertOne(userData);
  return result;
};


export const getAllUsers = async () => {
  try {
    const client = await connectToDB();
    const db = client.db("DashboardNext");
    const collection = db.collection("DashboardNext");

    const result = await collection.find({}).toArray();
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


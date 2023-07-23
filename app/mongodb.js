import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MongoDbURI, 
    {dbName: 'DashboardNext', useNewUrlParser: true,
    useUnifiedTopology: true,})
    
    isConnected = true ;
    console.log('MongoDB connected')

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; 
  }
};


export const insertUser = async (userData) => {
    const client = await connectToDB() ;
    const db = client.db('DashboardNext')
    const collection = db.collection('DashboardNext')

    const result = await collection.insertOne(userData);
  return result;
}

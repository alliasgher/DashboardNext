import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://alliasgher123:12345@cluster0.f9rvrwx.mongodb.net/DashboardNext?retryWrites=true&w=majority', 
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

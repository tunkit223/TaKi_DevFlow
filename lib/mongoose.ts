import mongoose, {Mongoose} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface MongoDBCache {
  conn:Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongoDBCache;
}

let cached = global.mongoose;

if(!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () : Promise<Mongoose> => {
  if(cached.conn) {
    return cached.conn;
  }

  if(!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName:"devflow",
    })
    .then((result)=>{
      console.log("MongoDB connected")
      return result;
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      throw new Error("MongoDB connection error: " + error.message);
    })
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect
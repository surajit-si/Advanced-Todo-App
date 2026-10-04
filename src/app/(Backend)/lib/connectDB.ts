import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable in .env.local",
  );
}

// 1. Declare global type interface to prevent TS errors
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// 2. Attach cache to global object (persists across HMR reloads in Dev)
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectDB(): Promise<Mongoose> {
  let cached = global.mongooseCache;

  if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
  }
  // 3. Return existing active connection if readyState is 1 (Connected)
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // 4. Prevent race conditions: create promise ONCE for concurrent callers
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGO_URI!, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
  } catch (error) {
    // Reset promise on error so subsequent requests can try again
    cached.promise = null;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;

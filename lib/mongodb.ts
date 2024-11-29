import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  try {
    if (cached?.conn) {
      console.log('Using cached connection');
      return cached.conn;
    }

    if (!cached?.promise) {
      const opts = {
        bufferCommands: false,
      };

      console.log('Creating new connection');
      cached!.promise = mongoose.connect(MONGODB_URI!, opts).then(() => mongoose);
    }

    const conn = await cached!.promise;
    cached!.conn = conn;
    return conn;
  } catch (e) {
    if (cached) cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }
}

export default dbConnect;

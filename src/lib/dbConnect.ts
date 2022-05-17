import { connect, ConnectOptions } from 'mongoose';

if (
  !process.env.MONGODB_BASEURI ||
  !process.env.MONGODB_PORT ||
  !process.env.MONGODB_NAME
) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}
const MONGODB_URI = `${process.env.MONGODB_BASEURI}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

/**
 * mongoとの接続を行う。２回目以降は、新しく接続を作るのではなくキャッシュされたものを使う
 * @returns connection object を返す
 */
const dbConnect = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const options: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  cached.connection = await cached.promise;

  return cached.connection;
};

export default dbConnect;

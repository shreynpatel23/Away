import mongoose from 'mongoose';
import { Caudex } from 'next/font/google';

const MONGODB_URI = process.env.MONGODB_URI || '';

// check mongodb connection string exist in environment variable or not

if( !MONGODB_URI ){
    
    throw new Error("Define MONGODB_URI envrionment var in .env.local file");

}

// get existing mongodb connection
let cached = global.mongoose;

// if there is no existing connection
// set properties
if( !cached ){
    cached = global.mongoose = { conn: null, promise: null };
}

// fun to connect to database
async function ConnectDB(){

    // return conn if there is already connection
    if( cached.conn ){
        return cached.conn;
    }

    // If there is no existing promise, create a new connection promise
    if (!cached.promise) {

        const opts = {
          bufferCommands: false,
        };

        // after the connection return the connection object
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    
    }

    // Wait for the promise to resolve and store the connection
    cached.conn = await cached.promise;

    return cached.conn;

}


export default ConnectDB;











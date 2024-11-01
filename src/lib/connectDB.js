import mongoose from "mongoose";

var cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }
    return cached.conn;
}


// let connected = false;
// const connectDB = async () => {
//     // strictQuery allows only fields specified in out schema to be saved to our database
//     mongoose.set("strictQuery", true);
//     // if database is already connected, don't connect again
//     if (connected) {
//         console.log("MongoDB is connected!");
//         return;
//     }
//     // connect to mongodb
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         connected = true;
//     } catch (e) {
//         console.log(e)
//     }
// }


export default connectDB;
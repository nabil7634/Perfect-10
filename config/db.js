import mongoose from "mongoose";

let cached = global.mongoose || {conn: null, promise: null};

export default async function connectDB(){
    if(cached.conn) {
        console.log("Using cached MongoDB connection");
        return cached.conn;
    }
    
    if(!cached.promise){
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
            family: 4, // Use IPv4, skip trying IPv6
        };
        
        console.log("Creating new MongoDB connection...");
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log("✅ MongoDB connected successfully!");
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ MongoDB connection error:", error.message);
                cached.promise = null; // Reset promise on error
                throw error;
            });
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        cached.promise = null; // Reset promise to allow retry
        throw error;
    }
    
    return cached.conn;
}

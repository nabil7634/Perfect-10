import mongoose from "mongoose";
import dns from 'dns';

// Set DNS to use Google's DNS servers to avoid DNS resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

let cached = global.mongoose || {conn: null, promise: null};

export default async function connectDB(){
    if(cached.conn) {
        console.log("✅ Using cached MongoDB connection");
        return cached.conn;
    }
    
    if(!cached.promise){
        const uri = process.env.MONGODB_URI || "mongodb+srv://perfect10:Perfect10cspokok90o@perfect10.ruebhli.mongodb.net/?appName=perfect10&retryWrites=true&w=majority";
        
        const clientOptions = {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true
            },
            bufferCommands: false,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 75000,
            connectTimeoutMS: 30000,
            maxPoolSize: 10,
            minPoolSize: 2,
            family: 4, // Force IPv4
        };
        
        console.log("🔌 Creating new MongoDB connection...");
        console.log("📍 MongoDB URI:", uri ? "✅ Found" : "❌ Not found");
        console.log("🌐 DNS Servers:", dns.getServers());
        
        if(!uri){
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        
        cached.promise = mongoose.connect(uri, clientOptions)
            .then(async (mongoose) => {
                console.log("✅ MongoDB connected successfully!");
                console.log("📊 Connection state:", mongoose.connection.readyState);
                console.log("🏠 Database name:", mongoose.connection.name);
                
                // Ping the database to verify connection
                try {
                    await mongoose.connection.db.admin().command({ ping: 1 });
                    console.log("🏓 Pinged your deployment. You successfully connected to MongoDB!");
                } catch (pingError) {
                    console.warn("⚠️ Could not ping database:", pingError.message);
                }
                
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ MongoDB connection error:", error.message);
                console.error("🔍 Error code:", error.code);
                console.error("🔍 Error syscall:", error.syscall);
                console.error("🔍 Full error:", error);
                cached.promise = null; // Reset promise on error
                throw error;
            });
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        cached.promise = null; // Reset promise to allow retry
        throw error;
    }
    
    return cached.conn;
}


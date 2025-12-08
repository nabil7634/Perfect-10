import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            }, { status: 401 });
        }

        // Connect to the database and fetch all chats for the user
        await connectDB();
        const data = await Chat.find({userId});

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error("Error fetching chats:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message 
        }, { status: 500 });
    }
}

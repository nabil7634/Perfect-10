import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const { userId } = await auth();

        if(!userId){
            return NextResponse.json({
                success: false, 
                message: "User not authenticated"
            }, { status: 401 })
        }
        
        // Prepare the chat data to be saved in the database
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
        };

        // Connect to the database and create a new chat
        await connectDB();
        const newChat = await Chat.create(chatData);

        return NextResponse.json({ 
            success: true, 
            message: "Chat created",
            data: newChat
        })

    } catch (error) {
        console.error("Error creating chat:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message 
        }, { status: 500 });
    }
}

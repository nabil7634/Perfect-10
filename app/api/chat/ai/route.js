export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req){
    try {
        console.log("🚀 AI Route: Request received");
        
        // Get userId from Clerk auth
        const { userId } = await auth();
        console.log("👤 User ID:", userId);

        if(!userId){
            console.error("❌ No user ID found - user not authenticated");
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            }, { 
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff',
                }
            });
        }

        // Extract chatId and prompt from the request body
        const { chatId, prompt } = await req.json();
        console.log("💬 Chat ID:", chatId);
        console.log("📝 Prompt:", prompt?.substring(0, 50) + "...");

        // Validate input
        if(!chatId || !prompt){
            console.error("❌ Missing chatId or prompt");
            return NextResponse.json({
                success: false,
                message: "ChatId dan prompt diperlukan",
            }, { 
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff',
                }
            });
        }

        // Connect to database
        console.log("🔌 Connecting to database...");
        await connectDB();

        // Find the chat document in the database based on userId and chatId
        console.log("🔍 Finding chat document...");
        const data = await Chat.findOne({userId, _id: chatId});

        if(!data){
            console.error("❌ Chat not found");
            return NextResponse.json({
                success: false,
                message: "Chat tidak dijumpai",
            }, { 
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff',
                }
            });
        }

        console.log("✅ Chat found, messages count:", data.messages.length);

        // Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };

        data.messages.push(userPrompt);

        // Call the Blackbox AI API to get a chat completion
        console.log("🤖 Calling Blackbox AI API...");
        
        if(!process.env.BLACKBOX_API_KEY){
            console.error("❌ BLACKBOX_API_KEY not found in environment variables");
            return NextResponse.json({
                success: false,
                message: "API key tidak dikonfigurasi",
            }, { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff',
                }
            });
        }

        // Call Blackbox AI API
        const response = await axios.post('https://api.blackbox.ai/api/chat', {
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            previewToken: null,
            userId: null,
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false,
            userSystemPrompt: null,
            maxTokens: 1024,
            playgroundTopP: 0.9,
            playgroundTemperature: 0.5,
            isChromeExt: false,
            githubToken: null,
            clickedAnswer2: false,
            clickedAnswer3: false,
            clickedForceWebSearch: false,
            visitFromDelta: false,
            mobileClient: false
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("✅ Blackbox AI API response received");
        console.log("Response data:", response.data);

        // Extract the response text
        let responseText = '';
        if (typeof response.data === 'string') {
            responseText = response.data;
        } else if (response.data.response) {
            responseText = response.data.response;
        } else if (response.data.choices && response.data.choices[0]) {
            responseText = response.data.choices[0].message.content;
        } else {
            responseText = JSON.stringify(response.data);
        }

        const message = {
            role: "assistant",
            content: responseText,
            timestamp: Date.now()
        };
        
        data.messages.push(message);
        await data.save();

        console.log("💾 Chat saved successfully");
        console.log("📤 Sending response to client");

        return NextResponse.json({
            success: true, 
            data: message
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff',
            }
        });

    } catch (error) {
        console.error("❌ Error in AI route:", error);
        console.error("Error stack:", error.stack);
        
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Ralat berlaku semasa memproses permintaan",
            error: error.message 
        }, { 
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'X-Content-Type-Options': 'nosniff',
            }
        });
    }
}

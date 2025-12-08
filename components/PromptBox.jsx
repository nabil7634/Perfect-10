import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const PromptBox = ({setIsLoading, isLoading}) => {

    const [prompt, setPrompt] = useState('');
    const {user, chats, setChats, selectedChat, setSelectedChat, createNewChat} = useAppContext();

    const handleKeyDown = (e)=>{
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            sendPrompt(e);
        }
    }

    const sendPrompt = async (e)=>{
        const promptCopy = prompt;

        try {
            e.preventDefault();
            console.log("📤 Sending prompt...");
            
            if(!user) {
                console.error("❌ User not logged in");
                return toast.error('Sila Log Masuk Untuk Bersembang');
            }
            
            if(isLoading) {
                console.warn("⚠️ Already loading");
                return toast.error('Tunggu respons sembang sebelumnya');
            }
            
            // Auto-create chat if no chat selected
            if(!selectedChat){
                console.log("🆕 No chat selected, creating new chat...");
                toast.loading('Sedang membuat komunikasi baru...');
                const newChat = await createNewChat();
                // Wait a bit for the chat to be created and selected
                await new Promise(resolve => setTimeout(resolve, 1500));
                toast.dismiss();
                
                if(!selectedChat && !newChat) {
                    console.error("❌ Failed to create chat");
                    toast.error('Gagal mencipta komunikasi, sila cuba semula.');
                    return;
                }
            }

            console.log("✅ Chat selected:", selectedChat?._id);
            setIsLoading(true);
            setPrompt("");

            const userPrompt = {
                role: "user",
                content: promptCopy,
                timestamp: Date.now(),
            }

            console.log("💾 Saving user prompt to state...");

            // saving user prompt in chats array
            setChats((prevChats)=> prevChats.map((chat)=> chat._id === selectedChat._id ?
             {
                ...chat,
                messages: [...chat.messages, userPrompt]
            }: chat
        ))
        
        // saving user prompt in selected chat
        setSelectedChat((prev)=> ({
            ...prev,
            messages: [...prev.messages, userPrompt]
        }))

        console.log("🚀 Calling AI API...");
        console.log("Chat ID:", selectedChat._id);
        console.log("Prompt:", promptCopy.substring(0, 50) + "...");

        const response = await axios.post('/api/chat/ai', {
            chatId: selectedChat._id,
            prompt: promptCopy
        }).catch(error => {
            console.error("❌ Axios error:", error);
            console.error("❌ Response data:", error.response?.data);
            console.error("❌ Response status:", error.response?.status);
            throw error;
        });

        const data = response.data;
        console.log("📥 API Response:", data);

        if(data.success){
            console.log("✅ AI response received successfully");
            
            setChats((prevChats)=>prevChats.map((chat)=>chat._id === selectedChat._id ? {...chat, messages: [...chat.messages, data.data]} : chat))

            const message = data.data.content;
            const messageTokens = message.split(" ");
            let assistantMessage = {
                role: 'assistant',
                content: "",
                timestamp: Date.now(),
            }

            setSelectedChat((prev) => ({
                ...prev,
                messages: [...prev.messages, assistantMessage],
            }))

            console.log("✨ Animating response...");
            for (let i = 0; i < messageTokens.length; i++) {
               setTimeout(()=>{
                assistantMessage.content = messageTokens.slice(0, i + 1).join(" ");
                setSelectedChat((prev)=>{
                    const updatedMessages = [
                        ...prev.messages.slice(0, -1),
                        assistantMessage
                    ]
                    return {...prev, messages: updatedMessages}
                })
               }, i * 100)
                
            }
        }else{
            console.error("❌ API returned error:", data.message);
            toast.error(data.message || "Ralat berlaku, sila cuba lagi");
            setPrompt(promptCopy);
        }

        } catch (error) {
            console.error("❌ Error in sendPrompt:", error);
            console.error("Error details:", error.response?.data || error.message);
            
            const errorMessage = error.response?.data?.message || error.message || "Ralat berlaku, sila cuba lagi";
            toast.error(errorMessage);
            setPrompt(promptCopy);
        } finally {
            setIsLoading(false);
            console.log("🏁 Request completed");
        }
    }

  return (
    <form onSubmit={sendPrompt}
     className={`relative w-full ${selectedChat?.messages.length > 0 ? "max-w-3xl" : "max-w-2xl"} glass-morphism-strong p-5 rounded-3xl mt-4 transition-all duration-300 focus-glow z-10 shadow-2xl`}>
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl -z-10"></div>
        
        <textarea
        onKeyDown={handleKeyDown}
        className='outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white placeholder:text-gray-400 text-base leading-relaxed'
        rows={2}
        placeholder='✨ JOM BERBUAL - Tanya apa sahaja...' 
        required 
        onChange={(e)=> setPrompt(e.target.value)} 
        value={prompt}/>

        <div className='flex items-center justify-between text-sm mt-3'>
            <div className='flex items-center gap-2'>
                {/* Optional: Add file upload or other features here */}
            </div>

            <div className='flex items-center gap-3'>
                <div className='glass-morphism p-2 rounded-xl hover-lift cursor-pointer glow-effect-hover transition-all duration-300'>
                    <Image className='w-4' src={assets.pin_icon} alt='Pin'/>
                </div>
                <button 
                    type='submit'
                    disabled={!prompt || isLoading}
                    className={`${prompt && !isLoading ? "btn-gradient" : "bg-gray-600/50"} rounded-full p-3 cursor-pointer transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg`}>
                    <Image className='w-4 aspect-square' src={prompt && !isLoading ? assets.arrow_icon : assets.arrow_icon_dull} alt='Send'/>
                </button>
            </div>
        </div>
        
        {/* Character count or status indicator */}
        {prompt && (
            <div className='mt-2 text-xs text-gray-400 fade-in'>
                <span className='glass-morphism px-2 py-1 rounded-lg'>
                    {prompt.length} aksara
                </span>
            </div>
        )}
    </form>
  )
}

export default PromptBox

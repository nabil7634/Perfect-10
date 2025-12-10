'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const containerRef = useRef(null)

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 animated-gradient-bg text-white relative overflow-hidden">
          {/* Corak Batik Merah dengan Elemen Teknologi */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Corak Batik Merah - Bulatan Besar */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-700/15 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-800/10 rounded-full blur-3xl"></div>
            
            {/* Elemen Teknologi Cyan/Blue */}
            <div className="absolute top-40 right-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            {/* Corak Batik SVG Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="batik-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  {/* Motif Bunga Batik */}
                  <circle cx="100" cy="100" r="30" fill="none" stroke="#dc2626" strokeWidth="2" opacity="0.4"/>
                  <circle cx="100" cy="100" r="20" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.3"/>
                  <circle cx="100" cy="100" r="10" fill="#b91c1c" opacity="0.2"/>
                  
                  {/* Motif Daun */}
                  <path d="M 100 70 Q 110 80 100 90 Q 90 80 100 70" fill="#7f1d1d" opacity="0.3"/>
                  <path d="M 70 100 Q 80 110 90 100 Q 80 90 70 100" fill="#7f1d1d" opacity="0.3"/>
                  <path d="M 100 110 Q 110 120 100 130 Q 90 120 100 110" fill="#7f1d1d" opacity="0.3"/>
                  <path d="M 110 100 Q 120 110 130 100 Q 120 90 110 100" fill="#7f1d1d" opacity="0.3"/>
                  
                  {/* Elemen Teknologi - Circuit Lines */}
                  <line x1="0" y1="100" x2="50" y2="100" stroke="#06b6d4" strokeWidth="1" opacity="0.2"/>
                  <line x1="150" y1="100" x2="200" y2="100" stroke="#06b6d4" strokeWidth="1" opacity="0.2"/>
                  <line x1="100" y1="0" x2="100" y2="50" stroke="#3b82f6" strokeWidth="1" opacity="0.2"/>
                  <line x1="100" y1="150" x2="100" y2="200" stroke="#3b82f6" strokeWidth="1" opacity="0.2"/>
                  
                  {/* Tech Nodes */}
                  <circle cx="50" cy="100" r="3" fill="#06b6d4" opacity="0.4"/>
                  <circle cx="150" cy="100" r="3" fill="#06b6d4" opacity="0.4"/>
                  <circle cx="100" cy="50" r="3" fill="#3b82f6" opacity="0.4"/>
                  <circle cx="100" cy="150" r="3" fill="#3b82f6" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#batik-pattern)"/>
            </svg>
            
            {/* Animated Tech Grid Lines */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
                linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}></div>
          </div>
          
          <style jsx>{`
            @keyframes gridMove {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(50px, 50px);
              }
            }
          `}</style>

          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full z-10">
            <div 
              onClick={()=> (expand ? setExpand(false) : setExpand(true))}
              className="p-2 rounded-lg glass-morphism hover-lift cursor-pointer glow-effect-hover"
            >
              <Image 
                className="rotate-180 w-6 h-6" 
                src={assets.menu_icon} 
                alt="Menu"
              />
            </div>
            <div className="p-2 rounded-lg glass-morphism">
              <Image 
                className="opacity-70 w-6 h-6" 
                src={assets.chat_icon} 
                alt="Chat"
              />
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="relative z-10">
              {/* Container untuk Logo */}
              <div className="flex flex-col items-center justify-center mb-8 fade-in">
                {/* Logo dengan ukuran dan styling - Tema Batik Merah */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 float-animation">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/30 to-cyan-500/20 blur-xl"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-red-600/30 animate-pulse"></div>
                  <Image
                    src={assets.logo_icon} 
                    alt="PERFECT - 10 Logo"
                    fill
                    className="object-contain rounded-full border-4 border-transparent p-2 shadow-2xl relative z-10 glow-effect"
                    style={{
                      borderImage: 'linear-gradient(135deg, #dc2626, #06b6d4) 1'
                    }}
                    sizes="(max-width: 768px) 128px, 160px"
                    priority
                  />
                </div>
                
                {/* Teks di bawah logo - Tema Batik */}
                <div className="glass-morphism px-6 py-3 rounded-2xl mb-4 glow-effect-hover border-2 border-red-600/20">
                  <p className="text-xl font-bold gradient-text">
                    🌺 PERFECT - 10 🌺
                  </p>
                </div>
              </div>

              {/* Teks Selamat Datang - Tema Batik Merah */}
              <div className="text-center max-w-3xl px-4">
                <div className="flex items-center justify-center gap-3 mb-6 fade-in-delay-1">
                  <div className="glass-morphism-strong px-8 py-6 rounded-3xl shadow-2xl border-2 border-red-600/20 relative overflow-hidden">
                    {/* Batik Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-red-600 rounded-full"></div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-4 border-cyan-500 rounded-full"></div>
                    </div>
                    <p className="text-2xl md:text-4xl font-bold mb-2 relative z-10">
                      <span className="text-white">💫 Salam Sejahtera 💫</span>
                    </p>
                    <p className="text-xl md:text-2xl font-medium relative z-10">
                      <span className="text-gray-300">Selamat Datang ke </span>
                      <span className="gradient-text font-bold">"PERFECT - 10"</span>
                    </p>
                  </div>
                </div>
                
                <div className="fade-in-delay-2">
                  <div className="glass-morphism px-6 py-4 rounded-2xl inline-block glow-effect-hover border-2 border-red-600/20">
                    <p className="text-lg md:text-xl text-gray-200 font-medium">
                      ✨ Apa yang boleh saya bantu hari ini? 🚀
                    </p>
                  </div>
                </div>
                
                {/* Decorative Elements - Tema Batik & Teknologi */}
                <div className="mt-12 flex justify-center gap-4 fade-in-delay-2 flex-wrap">
                  <div className="glass-morphism px-4 py-2 rounded-xl hover-lift cursor-pointer border border-red-600/30 glow-effect-hover">
                    <p className="text-sm text-gray-300">💬 Berbual</p>
                  </div>
                  <div className="glass-morphism px-4 py-2 rounded-xl hover-lift cursor-pointer border border-cyan-500/30 glow-effect-hover">
                    <p className="text-sm text-gray-300">🎯 Bantuan</p>
                  </div>
                  <div className="glass-morphism px-4 py-2 rounded-xl hover-lift cursor-pointer border border-red-600/30 glow-effect-hover">
                    <p className="text-sm text-gray-300">✨ Idea</p>
                  </div>
                  <div className="glass-morphism px-4 py-2 rounded-xl hover-lift cursor-pointer border border-cyan-500/30 glow-effect-hover">
                    <p className="text-sm text-gray-300">🌺 Kreatif</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              ref={containerRef}
              className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto z-10 px-2"
            > 
              {selectedChat && (
                <div className="fixed top-8 glass-morphism-strong py-2 px-4 rounded-xl font-semibold mb-6 glow-effect z-20 hover-lift border-2 border-red-600/20">
                  <p className="gradient-text">🌺 {selectedChat.name}</p>
                </div>
              )}
              
              {messages.map((msg, index)=>(
                <Message key={index} role={msg.role} content={msg.content}/>
              ))}
              
              {isLoading && (
                <div className="flex gap-4 max-w-3xl w-full py-3 scale-in">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/40 to-cyan-500/30 blur-md"></div>
                    <Image 
                      className="h-9 w-9 p-1 border-2 border-transparent rounded-full relative z-10 pulse-animation"
                      style={{
                        borderImage: 'linear-gradient(135deg, #dc2626, #06b6d4) 1'
                      }}
                      src={assets.logo_icon} 
                      alt="Logo"
                    />
                  </div>
                  <div className="loader flex justify-center items-center gap-2">
                    <div className="w-2 h-2 rounded-full"></div>
                    <div className="w-2 h-2 rounded-full"></div>
                    <div className="w-2 h-2 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
          
          <div className="absolute bottom-1 z-10">
            <div className="glass-morphism px-4 py-2 rounded-lg border border-red-600/20">
              <p className="text-xs text-gray-400 font-medium">
                🌺 DIKUASAKAN OLEH <span className="gradient-text font-bold">10 CREATIVE SOLUTION SDN.BHD</span> 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

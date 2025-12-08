import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { useClerk, UserButton } from '@clerk/nextjs'
import { useAppContext } from '@/context/AppContext'
import ChatLabel from './ChatLabel'

const Sidebar = ({expand, setExpand}) => {

    const {openSignIn} = useClerk()
    const {user, chats, createNewChat} = useAppContext()
    const [openMenu, setOpenMenu] = useState({id: 0, open: false})

  return (
    <div className={`flex flex-col justify-between sidebar-batik-gradient backdrop-blur-xl pt-7 transition-all duration-500 z-50 max-md:absolute max-md:h-screen border-r-2 border-red-600/30 shadow-2xl relative overflow-hidden ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}>
      {/* Corak Batik Background untuk Sidebar */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {/* Corak Batik Merah */}
        <div className="absolute top-10 left-5 w-32 h-32 border-4 border-red-600/40 rounded-full"></div>
        <div className="absolute top-40 right-5 w-24 h-24 border-4 border-red-700/30 rounded-full"></div>
        <div className="absolute bottom-40 left-8 w-28 h-28 border-4 border-red-600/35 rounded-full"></div>
        <div className="absolute bottom-10 right-6 w-20 h-20 border-4 border-cyan-500/40 rounded-full"></div>
        
        {/* Tech Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="100" x2="100%" y2="100" stroke="#dc2626" strokeWidth="1" strokeDasharray="5,5"/>
          <line x1="0" y1="300" x2="100%" y2="300" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5"/>
          <line x1="0" y1="500" x2="100%" y2="500" stroke="#dc2626" strokeWidth="1" strokeDasharray="5,5"/>
          <circle cx="20" cy="100" r="4" fill="#dc2626"/>
          <circle cx="20" cy="300" r="4" fill="#06b6d4"/>
          <circle cx="20" cy="500" r="4" fill="#dc2626"/>
        </svg>
      </div>
      <div>
        <div className={`flex ${expand ? "flex-row gap-10" : "flex-col items-center gap-8"} transition-all duration-300 relative z-10`}>
            <div className={`${expand ? 'scale-in' : 'pulse-animation'} relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-cyan-500/20 rounded-full blur-xl"></div>
                <Image 
                    className={`${expand ? "w-36" : "w-10"} transition-all duration-300 ${!expand && 'glow-effect'} relative z-10`} 
                    src={expand ? assets.logo_text : assets.logo_icon} 
                    alt='Logo'
                />
            </div>

            <div onClick={()=> expand ? setExpand(false) : setExpand(true)}
             className='group relative flex items-center justify-center glass-morphism hover:glass-morphism-strong glow-effect-hover transition-all duration-300 h-9 w-9 aspect-square rounded-xl cursor-pointer border border-red-600/30'>
                <Image src={assets.menu_icon} alt='Menu' className='md:hidden w-5'/>
                <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt='Toggle' className='hidden md:block w-6'/>
                <div className={`absolute w-max ${expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"} opacity-0 group-hover:opacity-100 transition-all duration-300 glass-morphism-strong text-white text-xs px-3 py-2 rounded-lg shadow-xl pointer-events-none z-50 border border-red-600/30`}>
                    {expand ? '🌺 Tutup Panel Sisi' : '🌺 Buka Panel Sisi'}
                    <div className={`w-2 h-2 absolute glass-morphism-strong rotate-45 ${expand ? "left-1/2 -top-1 -translate-x-1/2" : "left-4 -bottom-1"}`}></div>
                </div>
            </div>
        </div>

        <button onClick={createNewChat} className={`mt-8 flex items-center justify-center cursor-pointer transition-all duration-300 relative z-10 ${expand ? "btn-gradient rounded-2xl gap-3 p-3 w-full shadow-lg border-2 border-red-700/30" : "group relative h-10 w-10 mx-auto glass-morphism hover:glass-morphism-strong glow-effect-hover rounded-xl border border-red-600/30"}`}>
            <Image className={expand ? 'w-5' : 'w-6'} src={expand ? assets.chat_icon : assets.chat_icon_dull} alt='New Chat'/>
            <div className='absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition-all duration-300 glass-morphism-strong text-white text-xs px-3 py-2 rounded-lg shadow-xl pointer-events-none z-50 border border-red-600/30'>
                🌺 Perbualan Baharu
                <div className='w-2 h-2 absolute glass-morphism-strong rotate-45 left-4 -bottom-1'></div>
            </div>
            {expand && <p className='text-white text-sm font-semibold'>🌺 Perbualan Baharu</p>}
        </button>

        <div className={`mt-8 text-white/40 text-xs ${expand ? "block space-y-2" : "hidden"} relative z-10`}>
            <div className='glass-morphism px-3 py-2 rounded-lg mb-3 border border-red-600/30 glow-effect-hover'>
                <p className='font-bold gradient-text'>🌺 Terkini</p>
            </div>
            <div className='space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar-batik'>
                {chats.map((chat, index)=> <ChatLabel key={index} name={chat.name} id={chat._id} openMenu={openMenu} setOpenMenu={setOpenMenu}/>)}
            </div>
        </div>
      </div>

      <div>
        <div onClick={user ? null : openSignIn}
         className={`flex items-center ${expand ? 'glass-morphism hover:glass-morphism-strong rounded-xl p-3 border border-red-600/30' : 'justify-center w-full glass-morphism rounded-xl p-2 border border-red-600/30'} gap-3 text-white/70 text-sm mt-2 cursor-pointer transition-all duration-300 glow-effect-hover hover-lift relative z-10`}>
            {
                user ? (
                    <div className='scale-110 relative'>
                        <div className="absolute inset-0 bg-red-600/20 rounded-full blur-md"></div>
                        <UserButton/>
                    </div>
                ) : (
                    <div className='p-1 rounded-lg glass-morphism border border-red-600/30'>
                        <Image src={assets.profile_icon} alt='Profile' className='w-6'/>
                    </div>
                )
            }
            
            {expand && <span className='font-medium gradient-text'>🌺 Profil Saya</span>}
        </div>
      </div>

    </div>
  )
}

export default Sidebar
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
    <div className={`flex flex-col justify-between sidebar-gradient backdrop-blur-xl pt-7 transition-all duration-500 z-50 max-md:absolute max-md:h-screen border-r border-white/10 ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}>
      <div>
        <div className={`flex ${expand ? "flex-row gap-10" : "flex-col items-center gap-8"} transition-all duration-300`}>
            <div className={`${expand ? 'scale-in' : 'pulse-animation'}`}>
                <Image 
                    className={`${expand ? "w-36" : "w-10"} transition-all duration-300 ${!expand && 'glow-effect'}`} 
                    src={expand ? assets.logo_text : assets.logo_icon} 
                    alt='Logo'
                />
            </div>

            <div onClick={()=> expand ? setExpand(false) : setExpand(true)}
             className='group relative flex items-center justify-center glass-morphism hover:glass-morphism-strong glow-effect-hover transition-all duration-300 h-9 w-9 aspect-square rounded-xl cursor-pointer'>
                <Image src={assets.menu_icon} alt='Menu' className='md:hidden w-5'/>
                <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt='Toggle' className='hidden md:block w-6'/>
                <div className={`absolute w-max ${expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"} opacity-0 group-hover:opacity-100 transition-all duration-300 glass-morphism-strong text-white text-xs px-3 py-2 rounded-lg shadow-xl pointer-events-none z-50`}>
                    {expand ? 'Tutup Panel Sisi' : 'Buka Panel Sisi'}
                    <div className={`w-2 h-2 absolute glass-morphism-strong rotate-45 ${expand ? "left-1/2 -top-1 -translate-x-1/2" : "left-4 -bottom-1"}`}></div>
                </div>
            </div>
        </div>

        <button onClick={createNewChat} className={`mt-8 flex items-center justify-center cursor-pointer transition-all duration-300 ${expand ? "btn-gradient rounded-2xl gap-3 p-3 w-full shadow-lg" : "group relative h-10 w-10 mx-auto glass-morphism hover:glass-morphism-strong glow-effect-hover rounded-xl"}`}>
            <Image className={expand ? 'w-5' : 'w-6'} src={expand ? assets.chat_icon : assets.chat_icon_dull} alt='New Chat'/>
            <div className='absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition-all duration-300 glass-morphism-strong text-white text-xs px-3 py-2 rounded-lg shadow-xl pointer-events-none z-50'>
                Perbualan Baharu
                <div className='w-2 h-2 absolute glass-morphism-strong rotate-45 left-4 -bottom-1'></div>
            </div>
            {expand && <p className='text-white text-sm font-semibold'>✨ Perbualan Baharu</p>}
        </button>

        <div className={`mt-8 text-white/40 text-xs ${expand ? "block space-y-2" : "hidden"}`}>
            <div className='glass-morphism px-3 py-2 rounded-lg mb-3'>
                <p className='font-bold gradient-text'>📌 Terkini</p>
            </div>
            <div className='space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2'>
                {chats.map((chat, index)=> <ChatLabel key={index} name={chat.name} id={chat._id} openMenu={openMenu} setOpenMenu={setOpenMenu}/>)}
            </div>
        </div>
      </div>

      <div>
        <div onClick={user ? null : openSignIn}
         className={`flex items-center ${expand ? 'glass-morphism hover:glass-morphism-strong rounded-xl p-3' : 'justify-center w-full glass-morphism rounded-xl p-2'} gap-3 text-white/70 text-sm mt-2 cursor-pointer transition-all duration-300 glow-effect-hover hover-lift`}>
            {
                user ? (
                    <div className='scale-110'>
                        <UserButton/>
                    </div>
                ) : (
                    <div className='p-1 rounded-lg glass-morphism'>
                        <Image src={assets.profile_icon} alt='Profile' className='w-6'/>
                    </div>
                )
            }
            
            {expand && <span className='font-medium'>👤 Profil Saya</span>}
        </div>
      </div>

    </div>
  )
}

export default Sidebar
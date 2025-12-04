import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import toast from 'react-hot-toast'

const Message = ({role, content}) => {

    useEffect(()=>{
        Prism.highlightAll()
    }, [content])

    const copyMessage = ()=>{
        navigator.clipboard.writeText(content)
        toast.success('Message copied to clipboard')
    }

  return (
    <div className='flex flex-col items-center w-full max-w-3xl text-sm slide-in'>
      <div className={`flex flex-col w-full mb-8 ${role === 'user' && 'items-end'}`}>
        <div className={`group relative flex max-w-2xl py-4 rounded-2xl transition-all duration-300 ${
          role === 'user' 
            ? 'message-user-gradient px-6 hover-lift glow-effect-hover' 
            : 'gap-4 message-ai-gradient px-4 hover-lift'
        }`}>
            {/* Action Icons */}
            <div className={`opacity-0 group-hover:opacity-100 absolute ${
              role === 'user' ? '-left-20 top-3' : 'left-12 -bottom-8'
            } transition-all duration-300 z-10`}>
                <div className='flex items-center gap-2 glass-morphism px-3 py-2 rounded-xl shadow-lg'>
                    {
                        role === 'user' ? (
                            <>
                            <div className='hover:scale-110 transition-transform cursor-pointer p-1 hover:bg-white/10 rounded-lg' onClick={copyMessage}>
                                <Image src={assets.copy_icon} alt='Copy' className='w-4'/>
                            </div>
                            <div className='hover:scale-110 transition-transform cursor-pointer p-1 hover:bg-white/10 rounded-lg'>
                                <Image src={assets.pencil_icon} alt='Edit' className='w-4'/>
                            </div>
                            </>
                        ):(
                            <>
                            <div className='hover:scale-110 transition-transform cursor-pointer p-1 hover:bg-white/10 rounded-lg' onClick={copyMessage}>
                                <Image src={assets.copy_icon} alt='Copy' className='w-4.5'/>
                            </div>
                            <div className='hover:scale-110 transition-transform cursor-pointer p-1 hover:bg-white/10 rounded-lg'>
                                <Image src={assets.regenerate_icon} alt='Regenerate' className='w-4'/>
                            </div>
                            <div className='hover:scale-110 transition-transform cursor-pointer p-1 hover:bg-white/10 rounded-lg'>
                                <Image src={assets.like_icon} alt='Like' className='w-4'/>
                            </div>
                            <div className='hover:scale-110 transition-transform cursor-pointer p-1 hover:bg-white/10 rounded-lg'>
                                <Image src={assets.dislike_icon} alt='Dislike' className='w-4'/>
                            </div>
                            </>
                        )
                    }
                </div>
            </div>
            
            {/* Message Content */}
            {
                role === 'user' ? 
                (
                    <span className='text-white/95 leading-relaxed font-medium'>{content}</span>
                )
                :
                (
                    <>
                    <div className='relative flex-shrink-0'>
                        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-md'></div>
                        <Image 
                            src={assets.logo_icon} 
                            alt='AI' 
                            className='h-9 w-9 p-1.5 border-2 border-transparent rounded-full relative z-10 glow-effect'
                            style={{
                                borderImage: 'linear-gradient(135deg, #6a98d3, #8b5cf6) 1'
                            }}
                        />
                    </div>
                    <div className='space-y-4 w-full overflow-hidden'>
                        <div className='prose prose-invert max-w-none'>
                            <Markdown className='text-white/90 leading-relaxed'>{content}</Markdown>
                        </div>
                    </div>
                    </>
                )
            }
        </div>
      </div>
    </div>
  )
}

export default Message

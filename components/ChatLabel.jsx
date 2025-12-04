import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'

const ChatLabel = ({openMenu, setOpenMenu, id, name}) => {

  const {fetchUsersChats, chats, setSelectedChat} = useAppContext()

  const selectChat = ()=>{
    const chatData = chats.find(chat => chat._id === id)
    setSelectedChat(chatData)
    console.log(chatData)
  }
  const renameHandler = async ()=>{
    try {
      const newName = prompt('Enter new name')
      if(!newName) return 
      const {data} = await axios.post('/api/chat/rename', {chatId: id, name: newName})
      if(data.success){
        fetchUsersChats()
        setOpenMenu({id: 0, open: false})
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteHandler = async () =>{
    try {
      const confirm = window.confirm('Adakah anda pasti untuk memadam perbualan ini?')
      if(!confirm) return
      const {data} = await axios.post('/api/chat/delete', {chatId: id })
      if (data.success){
        fetchUsersChats()
        setOpenMenu({ id: 0, open: false })
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div onClick={selectChat} className='flex items-center justify-between p-3 text-white/80 glass-morphism hover:glass-morphism-strong rounded-xl text-sm group cursor-pointer transition-all duration-300 hover-lift glow-effect-hover mb-1'>
      <div className='flex items-center gap-2 flex-1 min-w-0'>
        <span className='text-xs'>💬</span>
        <p className='truncate font-medium'>{name}</p>
      </div>
      <div onClick={e=>{e.stopPropagation();setOpenMenu({id: id, open: !openMenu.open})}}
       className='group/menu relative flex items-center justify-center h-7 w-7 aspect-square glass-morphism hover:glass-morphism-strong rounded-lg transition-all duration-300 flex-shrink-0'>
        <Image src={assets.three_dots} alt='Menu' className={`w-4 transition-opacity duration-300 ${openMenu.id === id && openMenu.open ? 'opacity-100' : 'opacity-0'} group-hover/menu:opacity-100`}/>
        <div className={`absolute ${openMenu.id === id && openMenu.open ? 'scale-in' : 'hidden'} -right-36 top-8 glass-morphism-strong rounded-xl w-max p-2 shadow-2xl border border-white/10 z-50`}>
            <div onClick={renameHandler} className='flex items-center gap-3 hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all duration-300 hover-lift'>
                <div className='p-1 glass-morphism rounded-lg'>
                    <Image src={assets.pencil_icon} alt='Rename' className='w-3.5'/>
                </div>
                <p className='font-medium text-xs'>✏️ Nama Semula</p>
            </div>
            <div onClick={deleteHandler} className='flex items-center gap-3 hover:bg-red-500/20 px-4 py-2.5 rounded-lg transition-all duration-300 hover-lift mt-1'>
                <div className='p-1 glass-morphism rounded-lg'>
                    <Image src={assets.delete_icon} alt='Delete' className='w-3.5'/>
                </div>
                <p className='font-medium text-xs text-red-300'>🗑️ Padam</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChatLabel

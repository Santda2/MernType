import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessagesInput from './MessagesInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import ProfileAvatar from './ProfileAvatar'

function ChatContainer() {
  const {messages, getMessages, isMessagesLoading,selectedUser}=useChatStore()
  const {authUser} = useAuthStore()

  useEffect(() => {
    getMessages(selectedUser!._id)
    for (var m in messages){
      console.log(m)
    }
  }, [selectedUser,getMessages])


  if (isMessagesLoading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      <MessagesInput/>
    </div>
  )
  
  

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message)=>(
          <div
          key={message._id}
          className={`chat ${message.senderId === authUser!._id ? "chat-end" : "chat-start"}`}

          >
            <ProfileAvatar size={24} seed={message.senderId === authUser!._id ?authUser!.profilePic: selectedUser!.profilePic}/>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message.createdAt}
              </time>
            </div>
            <div className="chat-bubble flex">
              <p>{message.text}</p>
            </div>
          </div>
        ))}

      </div>

      <MessagesInput/>
    </div>
  )
}

export default ChatContainer
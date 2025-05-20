import { useChatStore } from '../store/useChatStore'
import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import MessagesInput from './MessagesInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import ProfileAvatar from './ProfileAvatar'

function ChatContainer() {
  const {messages, getMessages, isMessagesLoading,selectedUser, subscribeToMessages, unsubscribeToMessages}=useChatStore()
  const {authUser} = useAuthStore()
  const messageEndRef:any = useRef(null)

  useEffect(() => {
    getMessages(selectedUser!._id)
    subscribeToMessages()
    console.log(messages)
    return ()=>unsubscribeToMessages(); 

  }, [selectedUser!._id, getMessages, subscribeToMessages, unsubscribeToMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);



  const formatDate = (isoString:string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
          ref={messageEndRef}

          >
            <ProfileAvatar size={24} seed={message.senderId === authUser!._id ?authUser!.profilePic: selectedUser!.profilePic}/>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatDate(message.createdAt)}
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
import { Send } from "lucide-react"
import { useState } from "react"
import { useChatStore } from "../store/useChatStore";


const MessagesInput = () => {
  const [text,setText] = useState("")
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e:any) =>{
    e.preventDefault();
    if (!text.trim()) return;

    try {
      sendMessage({
        text:text.trim()
      })

      setText("")
    } catch (error) {
      console.error("Failed to send message", error)
    }
  };

  
  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessagesInput
import User from "../models/user.model.js"
import Message from "../models/message.model.js"

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUserForSidebar",error.message)
        res.status.json({message:"Internal server error"})
    }
}

export const getMessages = (req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id

        const messages = Message.find({
            $or:[
                {senderId:myId, reciverId:userToChatId},
                {senderId:userToChatId, reciverId:myId},
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessage = async (req,res)=>{
    try {
        const {text} = req.body
        const {id:reciverId} = req.params
        const senderId = req.user._id

        const newMessage = new Message({
            senderId,
            reciverId,
            text
        })
        
        await newMessage.save()
        //TODO socket.io
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}
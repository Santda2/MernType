import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance} from "../lib/axios"
import { useAuthStore } from "./useAuthStore";

interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
}
interface Message {
  _id: string; 
  senderId: string;
  receiverId: string; 
  text: string;
  createdAt: string; 
  updatedAt: string;
  __v?: number; 
}
interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser:(User:User | null)=>Promise<void>
  sendMessage:(messageData:any)=>Promise<void>
  subscribeToMessages:()=>void
}

export const useChatStore = create<ChatStore>((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: async (selectedUser)=>set({selectedUser}),
  
  subscribeToMessages: () =>{
    const {selectedUser} = get()
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage:Message) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      /*set({
        messages: [...get().messages, newMessage],
      });*/
    });
    //TODO UNsubscribe
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser!._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  },
}));
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


interface AuthUser {
  // Define your user type here based on what your API returns
  _id: string;
  email: string;
  fullName: string;
  profilePic:string;
  // Add other user properties as needed
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers:AuthUser[]
  
  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  login: (data:LoginData) => Promise<void>;
  updateProfile: (data:string) => Promise<void>;
}
interface LoginData{
  email:string,
  password:string
}

interface SignupData {
  email: string;
  password: string;
  name?: string;
  // Add other signup fields as needed
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  
  signup: async (data: SignupData) => {
    set({isSigningUp:true})
    try {
      const res = await axiosInstance.post("/auth/signup",data)
      set({authUser:res.data})
      toast.success("Account creaded successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }finally{
      set({isSigningUp:false})
    }
  },

  logout:async() =>{
    try {
      await axiosInstance.post("auth/logout")
      set({authUser:null})
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  },

  login:async(data)=>{
    set({isLoggingIn:true})
    try {
      const res = await axiosInstance.post("/auth/login",data)
      set({authUser:res.data})
      toast.success("Logged in successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }finally{
      set({isLoggingIn:false})
    }
  },
  updateProfile: async (profilePic: string) => { // Accept explicit string parameter
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", 
        { profilePic }, // Send as JSON object
        {
          headers: {
            "Content-Type": "application/json" // Explicitly set JSON
          }
        }
      );
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updating profile", error);
      toast.error("Something went wrong");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
  
}));
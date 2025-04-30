import mongoose from "mongoose"

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to db: "+conn.connection.host)
    }catch(e){
        console.log("MongoDB error "+e)
    }
}
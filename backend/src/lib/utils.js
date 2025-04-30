import jwt from "jsonwebtoken"

export const generateToken = (userId,res)=>{

    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token,{
    
        maxAge:604800000, //7days * 24hours * 60mins* 60segs *1000ms
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })

    return token
}
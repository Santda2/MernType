import  { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.ts'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageAuthPattern from '../components/ImageAuthPattern.tsx'
import toast from 'react-hot-toast'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const {signup,isSigningUp} = useAuthStore()
  
  const validateForm = ()=>{
    if (!formData.fullName.trim()) return toast.error("Full Name is required");

    if (!emailRegex.test(formData.email)) return toast.error("Not Valid Email");
    
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length<6) return toast.error("Password must be at least 6 characters");
    
    return true;

  }
  
  const handleSubmit = (e: { preventDefault: () => void })=>{
    e.preventDefault()

    const success= validateForm();

    if (success === true){
      signup(formData)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/*Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />{/*icons from lucide*/}
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with a free account</p>
            </div>
          </div>
          {/*Form*/}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/*NAME*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40"/>{/*icons from lucide*/}
                </div>
                <input type="text" 
                  className='input input-bordered w-full pl-10'
                  placeholder='Jhon Doe'
                  value={formData.fullName}
                onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
                />
              </div>
            </div>

            {/*email*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/40"/>{/*icons from lucide*/}
                </div>
                <input type="email" 
                  className='input input-bordered w-full pl-10'
                  placeholder='example@emial.com'
                  value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                />
              </div>
            </div>
            {/*password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an Acount?{" "}
              <Link to="/login" className='link'>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/*Right side */}
      <ImageAuthPattern
        title="Join in"
        subtitle="Chat, connect and share moments"
      />
    </div>
  )
}

export default SignUpPage
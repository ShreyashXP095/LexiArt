import React, { use, useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import axios from "axios"

const Login = () => {
    const [state , setState] = useState('Login');
    const {showLogin , setShowLogin , backendUrl , setToken , setUser} = useContext(AppContext)

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')

    const onsubmithandler = async (e)=>{
        e.preventDefault();

        try {
            if(state === 'Login'){
               const {data} =  await axios.post(backendUrl+'/api/user/login' , {email, password});

               if(data.success){
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token',data.token);
                setShowLogin(false);
               }else{
                    toast.error(data.message);
               }
            }else{
                const {data} =  await axios.post(backendUrl+'/api/user/register' , {name , email, password});

               if(data.success){
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token',data.token);
                setShowLogin(false);
               }else{
                    toast.error(data.message);
               }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


   useEffect(() => {
    if (showLogin) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
}, [showLogin]);
  return (
    <>
    {showLogin 
    &&
     <div className='absolute top-0 bottom-0 right-0 left-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
    { 
        <form onSubmit={onsubmithandler}
        className='relative bg-white p-10 rounded-xl text-slate-500 '>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Plese sign in to continue</p>
        {state !== 'Login' &&  <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img className='w-6' src={assets.profile_icon}/>
            <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm ' type='text' placeholder='Full Name' required/>
        </div>}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon}/>
            <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm ' type='email' placeholder='Email Id' required/>
        </div>
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon}/>
            <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm ' type='password' placeholder='Password' required/>
        </div>
        <p className='text-sm text-blue-500 my-4 cursor-pointer'>Forgot Password?</p>

        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'Create Account'}</button>

    {state === 'Login' ? <p  onClick={()=>(setState('Sign Up'))} className='mt-5 text-center'>Don't have an Account?<span className='text-blue-500 cursor-pointer'>Sign Up</span></p> :
    <p onClick={()=>(setState('Login'))} className='mt-5 text-center'>Already have an Account?<span className='text-blue-500 cursor-pointer'>Login In</span></p>}

        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer'/>
    </form>}
    </div>}
    </>
  )
}

export default Login
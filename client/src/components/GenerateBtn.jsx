import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const GenerateBtn = () => {
    const navigate = useNavigate();
    const {showLogin , setShowLogin} = useContext(AppContext)
        const { user , setUser} = useContext(AppContext);
    
        const onclickhandler = () =>{
          if(!user){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowLogin(true);
          }else{
            navigate("/result");
          }
        }
  return (
    <div className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
        See the magic , Try Now
        </h1>
        <button onClick={onclickhandler} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all divide-neutral-400'> Generate Images
            <img src={assets.star_group} className='h-6'/>

        </button>
    </div>
  )
}

export default GenerateBtn
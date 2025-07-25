import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

    const {user , setShowLogin , showLogin , logout , credit} = useContext(AppContext)

    const navigate = useNavigate();

    const handlelogin = () =>{
      navigate('/');
      setShowLogin(true);
    }

  return (
    <div className="flex items-center justify-between py-2">
      <Link to="/">
        <div className="flex py-4 items-center justify-between gap-3 w-12">
          <img src="vite.svg" className=" w-9 sm:wd-18 lg:w-18 " />
          <span className="text-xl font-bold">LexiArt</span>
        </div>
      </Link>

      <div>
         {/* two divs one  for logged in user and other one for logged out user */}
        {
        user ? 
        <div className=" flex items-center gap-2 sm:gap-3">
            <button onClick={()=>navigate("/buy-credit")} className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700">
                <img className="w-5" src={assets.credit_star}/>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Credits Left: {credit}</p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi,{user.name}</p>
            <div className="relative group">
                <img src={assets.profile_icon} className="w-10 drop-shadow"/>
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                    <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                        <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">
                            Logout
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        :
        <div className="flex items-center gap-2 sm:gap-5">
        <p onClick={()=>navigate('/buy-credit')} className="cursor-pointer">Pricing</p>
            <button onClick={handlelogin} className="bg-zinc-800 text-white px-7 py-2 sm:py-2 text-sm rounded-full">Login</button>
        </div>
    }
        
       
      </div>
    </div>
  );
};

export default Navbar;

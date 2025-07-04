import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react"

const Header = () => {
    const navigate = useNavigate();
    const {showLogin , setShowLogin} = useContext(AppContext)
    const { user , setUser} = useContext(AppContext);

    const onclickhandler = () =>{
      if(!user){
        setShowLogin(true);
      }else{
        navigate("/result");
      }
    }
  return (
    <motion.div
    initial={{opacity:0.2 ,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1 , y:0}}
    viewport={{once:true}}
     className="flex flex-col items-center justify-center my-20 text-center">
      <motion.div
      initial={{opacity:0.2 ,y:-20}}
    animate={{opacity:1 , y:0}}
    transition={{delay:0.2 , duration:0.8}}
       className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
        <p>Best Text to Image Generator</p>
        <img src={assets.star_icon} />
      </motion.div>
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto  mt-10 text-center">
        Turn text to <span className="text-blue-500">image</span>, in seconds.
      </h1>

      <p className="text-center max-w-xl mx-auto mt-5">Un1eash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.</p>

        <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{default:{duration:0.5} , opacity:{delay:0.8 , duration:1.1}}}
         onClick={
          onclickhandler
          } className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-400">
            Generate Images
            <img className="h-6" src={assets.star_group}/>
        </motion.button>

        <div className="flex gap-3 justify-center flex-wrap mt-16">
            {Array(6).fill("").map((item,index)=>(
                <img className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10" src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2} key={index}  width={70}/>
            ))}
        </div>
        <p className="mt-4 text-neutral-500">Generated Images from LexiArt</p>
    </motion.div>
  );
};

export default Header;

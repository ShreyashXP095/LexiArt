import jwt from "jsonwebtoken";

export const userAuth = async(req,res,next) =>{
    const {token} = req.headers;

    if(!token){
        return res.status(500).json({success:false , message:"Invalid token Login Again"});

    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.userId = tokenDecode.id;
        }else{
             return res.status(500).json({success:false , message:"Invalid token Login Again"});

        }

        next();
    } catch (error) {
        console.error("Error in auth.js");
        return res.json({success:false, message:error.message});
    }
}
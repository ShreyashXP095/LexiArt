import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({ message: "All fields are required" });
    }

    const alreadyuser = await userModel.findOne({ email });
    if (alreadyuser)
      return res.status(400).json({ message: "Email already Exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      savedUser: { name: savedUser.name },
    });
  } catch (error) {
    console.log("Error in registering users");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log("Error in Login users");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userCredits = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log("Error in userCredits users");
    return res.status(500).json({ message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: "rzp_test_8HoOy89kBYB4vY",
  key_secret: "iiSujTtJVy2rd2qFWaelB1eu",
});

export const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const {  planId } = req.body;
   

    const userData = await userModel.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }

    let credits, amount, date, plan;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

        default:
          return res.json({success:false, message:"Plan not found"});
    }
    date = Date.now();

    const transactionData = {
      userId , plan , amount , date , credits
    }

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount : amount * 100,
      currency : process.env.CURRENCY,
      receipt: newTransaction._id,
    }

    await razorpayInstance.orders.create(options, (error , order)=>{
      if(error){
        console.log(error);
        return res.json({success:false , message:error.message});
      }

      res.json({success: true , order})
    })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export const verifyRazorpay = async(req, res)=>{
  try {
      const {razorpay_order_id} = req.body;

      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

      if(orderInfo.status === 'paid')
      {
        const transactionData = await transactionModel.findById(orderInfo.receipt);

        if(transactionData.payment){
          return res.json({success:false , message:"payment failed"});
        }

        const userData = await userModel.findById(transactionData.userId);

        const creditBalance = userData.creditBalance + transactionData.credits

        await userModel.findByIdAndUpdate(userData._id , {creditBalance});

        await transactionModel.findByIdAndUpdate(transactionData._id , {payment:true});

        res.json({success:true , message:"Credits Added"});
      }else{
        res.json({success:false , message:"Payment failed"});

      }


  } catch (error) {
    console.log(error);
    res.json({success:false , message:error.message});
  }
}
import mongoose from "mongoose";

const transitionSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        plan:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        payment:{
            type:Boolean,
            default:false
        },
        credits:{
            type:Number,
            required:true
        },
        date:{
            type:Number,
        },

    }
)

const transactionModel =mongoose.models.transaction ||  mongoose.model("transaction" , transitionSchema);

export default transactionModel;
const mongoose=require("mongoose")

const planSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    expense:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Plan=mongoose.model('Plan',planSchema)

module.exports=Plan
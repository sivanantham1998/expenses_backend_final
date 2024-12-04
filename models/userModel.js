const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(()=>{
    console.log("Database connected")
}).catch(err=>{
    console.log(err)
})
const user=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

const userSchema=mongoose.model("User",user)

module.exports=userSchema;

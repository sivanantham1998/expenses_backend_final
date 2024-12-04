const userSchema = require("../models/userModel");
const Plan = require("../models/planModel");
let bcrypt=require("bcryptjs")
let jwt=require("jsonwebtoken")
exports.registerUser=async(req,res,next)=>{
    let {username,password}=req.body;
   try{
        let saltRound=10
        let secretKey="DT7ApgiSxr"
        let exipres=36000   
        let hashCode=await bcrypt.hash(password,saltRound);
        let newUser=new userSchema({username,password:hashCode})
        let token=await jwt.sign({id:newUser._id},secretKey,{expiresIn:exipres})
        await newUser.save()
        newUser.token=token
        res.status(201).json({
            msg:"saved",
            newUser,
            token
        })
   }catch(err){
    res.status(400).json({
        msg:err.message
    })
   }
}
exports.loginUser=async(req,res,next)=>{
    let {username,password}=req.body
    let secretKey="DT7ApgiSxr"
    let exipres=36000000
    try{
        let user=await userSchema.findOne({username})
        if(!user){
            res.status(400).json({msg:"User not Found"})
        }
        let match=await bcrypt.compare(password,user.password)
        if(match){
            let usertoken=await jwt.sign({id:user._id},secretKey,{expiresIn:exipres})
            res.cookie('token',usertoken,{httpOnly:true})
            res.status(200).json({msg:"login",usertoken,user})
        }
        else{
            res.status(401).json({msg:"password not match"})
        }
    }
    catch(err){
        res.status(400).json({msg:err.message})
    }
    
}
exports.logOut=async(req,res,next)=>{
    try{
        if(!req.cookies.token){
            res.status(404).json({msg:"No cokkies"})
        }
        else
        {
            res.clearCookie('token')
            res.status(200).json({msg:"successfully logout"})
        }
    }catch(err){
        res.status(400).json({msg:err.message})
    }
}
// authdicated user
exports.authendicatedUser=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token) return res.status(401).json("no token")
        let secretKey="DT7ApgiSxr"

    try {
        let decoded=jwt.verify(token,secretKey)
        let user=await userSchema.findById(decoded.id)
        if(!user) return res.status(401).json({msg:"User not found"})
        req.user=user
        next()
    } catch (error) {
        res.status(401).json({msg:"token not valid"})
    }
}

exports.demo = (req, res, next) => {
   try {
    if (req.user) {
        res.json({
            msg: "ok done",
            user:req.user
        });
    } else {
        res.status(401).json({ msg: "No user logged in" });
    }
   } catch (error) {
            res.status(401).json({msg:"no user"})
   }
};
// exports.postPlans=async(req,res,next)=>{
//     let {expense,amount,desc}=req.body
//     try {
//         let userId=req.user._id
//         let newPlan=new Plan({userId,expense,amount,desc})
//         await newPlan.save()
//         res.status(200).json({msg:"success",newPlan})
//     } catch (error) {
//         res.status(401).json({msg:"problem",error})
//     }
// }

exports.prePostPlans=async(req,res,next)=>{
    let {userId,expense,amount,desc}=req.body;
    try {
        const newPlan=new Plan({userId,expense,amount,desc})
        await newPlan.save()
        res.status(200).json({msg:newPlan})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
exports.getPlans=async(req,res,next)=>{
    let data=await Plan.find()
    res.json(data)
}
exports.userPlans = async (req, res, next) => {
    try {
        let userId = req.user._id;
        let data = await Plan.find({ userId: userId });
        res.status(200).json(data);
        // console.log(data);
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }    
};

exports.getsingleuser=async(req,res,next)=>{
    try {
        let data=await Plan.find()
        // console.log(data)
        res.status(200).json({msg:data})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}
const express=require("express")
const app=express()
const cors=require("cors")
const cookie=require("cookie-parser")
const dotenv=require("dotenv")
const user=require("./router/userRouter")
dotenv.config()
// middleware
app.use(express.json())
app.use(cookie())
app.use(cors({credentials:true,origin:'https://expenses-tracker-siva.netlify.app'}))
app.use("/api",user)

app.listen(100,console.log("server running"))

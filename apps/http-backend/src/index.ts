
import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/common-backend/config";
import { middleware } from "./middleware";
const app = express()


app.post("/signup",(req,res)=>{

})


app.post("/signin", (req,res)=>{
    const userId = 1;

   const token = jwt.sign({
        userId
    }, JWT_SECRET)
})


app.post("/room", middleware, (req,res)=>{
    // DB Call
    res.json({
        roomId:123
    })
})





app.listen(3001, ()=>{
    console.log("Backend is listening PORT 3001 ");
    
});

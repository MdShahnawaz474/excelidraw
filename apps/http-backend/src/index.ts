import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SiginSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
const app = express();

app.use(express.json());
app.post("/signup", async(req, res) => {

  const parseData = CreateUserSchema.safeParse(req.body);
  if(!parseData.success){
    console.log(parseData.error);
    res.json({
      "message":"Incorrect Inputs"
    })
    return ;
  }

  try {
    const user = await prismaClient.user.create({
      data:{
        email:parseData.data?.username, 
        // Hashed password
        password:parseData.data.password,
        name : parseData.data.name
      }
    })  
    res.json({
      userId:user.id
    })
  } catch (error) {
    res.status(411).json(
      {
        message:"User already exists"
      }
    )
    
  }
});

app.post("/signin", async(req, res) => {
  const parseData = SiginSchema.safeParse(req.body)
  if(!parseData.success){
    res.json({
        message:"Incorrect inputs"
    })
    return;

  }

  const user = await prismaClient.user.findFirst({
    where:{
      email:parseData.data.username,
      password:parseData.data.password
    }
  })

  if(!user){
    res.status(403).json({
      "message":"Not authorized"
    })
  }

  const token = jwt.sign(
    {
      userId:user?.id
    },
    JWT_SECRET 
  );
  res.json({
    token
  })
});

app.post("/room", middleware, async (req, res) => {

  
  const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
  
    // @ts-ignore
    const userId = req.userId

    try {
   const room =  await prismaClient.room.create({
        data:{
          slug:parsedData.data.name,
          adminId:userId
        }
      }) 
  
      // DB Call
    res.json({
      roomId: room.id
    });
    } catch (error) {
      res.status(411).json({
        message: "Room already exists with this name"
    })
    }
   
});

app.get("/room/:roomId",(req,res)=>{
  const roomId =  Number(req.params.roomId)
 const messages = prismaClient.chat.findMany({
    where:{
      roomId:roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  })
  res.json({
    messages
  })
});

app.get("/chats/:slug",async  (req,res)=>{
  const slug =req.params.slug;
  const room=await prismaClient.room.findFirst({
    where:{
      slug
    }
  });

  res.json({
    room
  })
})

app.listen(3001, () => {
  console.log("Backend is listening PORT 3001 ");
});

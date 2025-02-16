import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SiginSchema } from "@repo/common/types";
const app = express();

app.post("/signup", (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if(!data.success){
     res.json({
        message:"Incorrect Inputs"
    })
    return;
  }

  res.json({
    userId:"1234"
  })
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const data = SiginSchema.safeParse(req.body)
  if(!data){
    res.json({
        message:"Incorrect inputs"
    })
    return;

  }
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    token
  })
});

app.post("/room", middleware, (req, res) => {
  
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
  
    // DB Call
  res.json({
    roomId: 123,
  });
});

app.listen(3001, () => {
  console.log("Backend is listening PORT 3001 ");
});

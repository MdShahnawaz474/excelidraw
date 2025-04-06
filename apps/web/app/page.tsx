"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation"; // ✅ CORRECT for App Router

export default function Home() {

  const [roomId,setRoomId] = useState("");
  const router = useRouter()
  return (
    <div style={{backgroundColor:"white",color:"white", marginBottom:'10px', marginTop:"20px"}}>
     <input style={{backgroundColor:"black"}} value={roomId} onChange={(e)=>{
      setRoomId(e.target.value)
     }} type="text" placeholder="room Id" />

     <div>
     <button onClick={()=>{
      router.push(`/room/${roomId}`)
     }}>Join Room</button></div>
    </div>
  );
}

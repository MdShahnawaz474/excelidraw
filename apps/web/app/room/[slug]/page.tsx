import axios from 'axios';
import React from 'react'
import { BACKEND_URL } from '../../config';
import { ChatRoomClient } from '../../../components/ChatroomClient';
import { ChatRoom } from '../../../components/ChatRoom';

async function getRoomId(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data.id;
}

   const ChatRoom1 = async({ params }: { params: { slug: string } }) => {
  const slug = (await params.slug);
  const roomId =  await getRoomId(slug)
  
  return (
    <ChatRoom id={roomId}/>
  )
}

export default ChatRoom1

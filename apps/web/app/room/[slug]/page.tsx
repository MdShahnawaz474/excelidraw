import React from 'react'

async function getRoom(slug:string){
  
}

const ChatRoom = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  return (
    <div>
      <h1>Chat Room: {params.slug}</h1>
    </div>
  )
}

export default ChatRoom

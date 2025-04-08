"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages = [], // <-- default to empty array
  id,
}: {
  messages?: { messages: string }[]; // <-- optional now
  id: string;
}) {
  const [chats, setChats] = useState<{ messages: string }[]>(messages);
  const { socket, loading } = useSocket();
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
      socket.onmessage = (event) => {
        const parseData = JSON.parse(event.data);
        if (parseData.type === "chat") {
          setChats((prev) => [...prev, { messages: parseData.messages }]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((m, ind) => (
        <div key={ind}>{m.messages}</div>
      ))}

      <input
        type="text"
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      />

      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              messages: currentMessage,
            })
          );
          setCurrentMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

export function Chat({ user, friend, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  console.log(messages)
  console.log(message)

  useEffect(() => {
    const fetchMessagesOfUser = async () => {
      try {
        const response = await fetch(`/api/getAllMessages`);

        if (!response.ok) {
          throw new Error("Error fetching messages");
        }

        const data = await response.json();
        
        // Filter messages between user and friend
        const filteredMessages = data.filter(
          (msg) =>
            (msg.sender === user && msg.receiver === friend) ||
            (msg.sender === friend && msg.receiver === user)
        );

        setMessages(filteredMessages);
      } catch (error) {
        console.error("Error fetching messages", error);
        setMessages([]);
      }
    };

    fetchMessagesOfUser();
  }, [user, friend, message]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log("submit message");
    setMessage("");
    handleSendMessage()
  };

  const handleSendMessage = async () => {
    try {
      const response = await fetch("/api/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: user,
          receiver: friend,
          content: message,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  const renderedMessages = messages.map((msg, index) => (
    <div key={index} className="mb-2 text-black">
      <span className="font-bold">{msg.sender}:</span> {msg.content}
    </div>
  ))

  return (
    <div ref={chatRef} className="text-white mb-24 justify-center flex w-96 h-96">
      <form onSubmit={handleMessageSubmit} className="border relative w-4/5 bg-white">
        <div onClick={onClose} className="text-red-500 text-3xl flex justify-end">
          <IoMdCloseCircleOutline />
        </div>
        {renderedMessages}
        <input
          value={message}
          onChange={handleMessageChange}
          className="bg-gray-200 text-gray-800 p-2 text-sm max-w-xs w-full absolute bottom-0"
          type="text"
        />
        <button type="submit" className="text-xl text-blue absolute bottom-2 right-2">
          <IoSend />
        </button>
      </form>
    </div>
  );
}

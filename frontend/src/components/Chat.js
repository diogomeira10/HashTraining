import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

export function Chat({ user, friend, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

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

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    console.log("submit message");
    setMessage("");
    await handleSendMessage();
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
    <div
      key={index}
      className={`flex ${
        msg.sender === user ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`bg-gray-300 p-2 rounded-lg ${
          msg.sender === user ? "bg-green-500 text-white ml-auto mr-2" : "bg-gray-400"
        }`}
      >
        <span className="font-bold">{msg.sender !== user && msg.sender}</span>
        <span className="ml-2">{msg.content}</span>
      </div>
    </div>
  ));

  return (
    <div ref={chatRef} className="text-white mb-24 justify-center flex w-96 h-96 rounded">
      <form onSubmit={handleMessageSubmit} className="border relative w-4/5 bg-white rounded">
        <div className="text-center py-2 bg-gray-400 mb-2">{friend}</div>
        <div onClick={onClose} className="text-red-500 text-3xl flex justify-end absolute top-1 right-0">
          <IoMdCloseCircleOutline />
        </div>
        <div className="max-h-72 overflow-auto">{renderedMessages}</div>
        <input
          value={message}
          onChange={handleMessageChange}
          className="bg-gray-200 text-gray-800 p-2 text-sm max-w-xs w-full absolute bottom-0 rounded"
          type="text"
          placeholder="Type your message..."
        />
        <button type="submit" className="text-xl text-blue absolute bottom-2 right-2">
          <IoSend />
        </button>
      </form>
    </div>
  );
}
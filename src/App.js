import React, { useState, useEffect, useRef } from "react";
import { database } from "./utils/firebase";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatRef = database.ref("chatMessages");
    chatRef.on("value", (snapshot) => {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        messages.push(message);
      });
      setMessages(messages);
    });

    return () => {
      chatRef.off("value"); // Cleanup the listener
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message) {
      database.ref("chatMessages").push({
        text: message,
        timestamp: Date.now(),
      });
      setMessage("");
    }
  };

  // Function to format a timestamp as a human-readable time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="MessageList" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className="Message">
            <div className="MessageText">{message.text}</div>
            <div className="MessageTime">{formatTime(message.timestamp)}</div>
          </div>
        ))}
      </div>
      <div className="InputBox">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

// https://youtu.be/djMy4QsPWiI?list=RDCMUC8S4rDRZn6Z_StJ-hh7ph8g
import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [msg, setMsg] = useState('hello');
  const [messageReceived, setMessageReceived] = useState('');
  const sendMessage = () => {
    socket.emit("sendMessage", { message: msg });
  }
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessageReceived(msg.message);
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder="Message..." value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;

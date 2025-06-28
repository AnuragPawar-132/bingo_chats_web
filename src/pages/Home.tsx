import React from 'react'
// Use the browser's native WebSocket API instead of importing 'ws'

const Home = () => {

const socket = new window.WebSocket('ws://localhost:8081');

socket.onopen = () => {
  console.log('✅ Connected');
  socket.send('Hello Server!');
};

socket.onmessage = (event) => {
  console.log('📨 Server says:', event.data);
};
  return (
    <div>Home</div>
  )
}

export default Home
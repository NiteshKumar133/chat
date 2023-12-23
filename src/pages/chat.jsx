import React, { useEffect, useState,useRef } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

import socketIo from "socket.io-client";
import Chatuser from './chatuser';
let socket;
let user = ' ';
while (user.length <=3){
  user = prompt("enter your name");
}

export default function Chat() {
  const URL = 'https://chat-api-delta.vercel.app/';
  const [data, setdata] = useState();
  const [array, setarray] = useState([]);
  const [id, setid] = useState("");
  const chatContainerRef = useRef(null);
  const send_data = () => {
    if(data.trim() !== ''){
      socket.emit('msg', { data:data.trim(), id });
      setdata('');
    }
  }
  useEffect(() => {
    socket = socketIo(URL, { transports: ['websocket'] });
    socket.on('connect', () => {
      // alert('Connected');
      setid(socket.id);
     

    })
    
    socket.emit('joined', { user,id });
    socket.on('userJoined', (data) => {
     
      setarray([...array, data]);
      console.log(data)
    })
    return () => {
      //socket.emit('disconnect');
      socket.off();
    }
  }, []);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      send_data();
    }
  };
  useEffect(() => {
    scrollToBottom();
    socket.on('sendMessage', (data) => {
      // console.log(data);
      setarray([...array, data]);
    })
    return () => {
      socket.off();
    }
  }, [array])
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  return (
    <div className='box-container'>
      <Chatuser />
      <div className='top-bottom'>
        <div  className='message-container'  ref={chatContainerRef}  >
          {array.map((item, i) => (<div className={`message ${item.id === id ? 'right' : 'left'}`} key={i}>{item.id === id?`You:${item.data}`:`${item.user}:${item.data}`}</div>))}
        </div>
        {/* <EmojiPicker /> */}
        <div className='bottom-container'>
          <input type='text' value={data} placeholder='Type message' className='input-box' onChange={e => { setdata(e.target.value) }} onKeyDown={handleKeyDown} />
          <div className='image-container'><img src='https://cdn-icons-png.flaticon.com/512/3682/3682321.png' className='send-msg-icon' onClick={send_data} /></div>
        </div>
      </div>
    </div>
  )
}

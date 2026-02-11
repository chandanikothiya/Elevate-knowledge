import React from 'react';
import { io } from 'socket.io-client';


function Chat(props) {

    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
        console.log("soketID:",socket.id)
    });

    socket.on('welcome',(message) => {
        console.log(message);
    })

    return (
        <div>
            
        </div>
    );
}

export default Chat;
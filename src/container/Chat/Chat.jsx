import React, { useState } from 'react';
import { io } from 'socket.io-client';
import MyTextField from '../../admin/components/MyTextField/MyTextField';
import { Button, TextField } from '@mui/material';

function Chat(props) {

    const [formdata, setFormData] = useState({ socketid: '', message: '' })

    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
        console.log("soketID:", socket.id)
    });

    socket.on('welcome', (message) => {
        console.log(message);
    })

    function handleChange(e) {
        //console.log(e.target.name,e.target.value,{[e.target.name]:e.target.value}) //use [] beacuse 1 change function use for multiple input
        setFormData({ ...formdata, [e.target.name]: e.target.value })
    }

    function handlesubmit() {
        event.preventDefault();
        console.log("ok")
        //console.log(formdata)
       socket.emit("sendmsg",{id:formdata.socketid,message:formdata.message})
    }

    socket.on('recivemessage', (message) => {
        console.log(message);
    })

    return (

        <form
            style={{ display: 'flex', flexDirection: 'column', width: '400px', padding: '30px', boxShadow: '0 0 4px 0 rgba(0,0,0,0.25)', margin: '20px auto 0 auto', borderRadius: '5px' }}
            onSubmit={handlesubmit}
        >

            <h3>Send Message</h3>

            <TextField
                variant='standard'
                label="Socket ID"
                name='socketid'
                id='socketid'
                value={formdata.socketid}
                onChange={handleChange}
            />

            <TextField
                variant='standard'
                label="Enter Message"
                name='message'
                id='message'
                multiline
                rows={4}
                style={{ marginTop: '20px' }}
                value={formdata.message}
                onChange={handleChange}
            />

            <Button type='submit' variant='contained' style={{ marginTop: '30px' }}>Send Message</Button>
        </form>

    );
}

export default Chat;
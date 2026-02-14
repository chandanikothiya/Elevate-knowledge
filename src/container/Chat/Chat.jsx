import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import MyTextField from '../../admin/components/MyTextField/MyTextField';
import { Button, TextField } from '@mui/material';

function Chat(props) {

    const [formdata, setFormData] = useState({ to: '', message: '' })
    const [recivemsg, setReciveMsg] = useState([])
    const [groupname, setGroupName] = useState('')

    const socket = useMemo(() => io('http://localhost:4000'), [])  //io('http://localhost:4000');

    useEffect(() => {
        socket.on("recive_msg", (message) => {
            //console.log(message)
            setReciveMsg((prev) => [...prev, message])
        })
    }, [])

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
        console.log("ok", formdata.to, formdata.message)
        //console.log(formdata)
        //socket.emit("sendmsg",{id:formdata.socketid,message:formdata.message})
        socket.emit("send_msg", { to: formdata.to, message: formdata.message })
    }

    // socket.on('recivemessage', (message) => {
    //     console.log(message);
    // })

    function handlegroupsubmit() {
        event.preventDefault();
        socket.emit("groupname", groupname)
    }


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <form
                    style={{ display: 'flex', flexDirection: 'column', width: '400px', padding: '30px', boxShadow: '0 0 4px 0 rgba(0,0,0,0.25)', margin: '20px 0 0 0', borderRadius: '5px' }}
                    onSubmit={handlesubmit}
                >

                    <h3>Send Message</h3>

                    <TextField
                        variant='standard'
                        label="Socket ID"
                        name='to'
                        id='to'
                        value={formdata.to}
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

                <div style={{ width: '600px', boxShadow: '0 0 4px 0 rgba(0,0,0,0.25)', marginTop: '20px', backgroundColor: '#d7e8fd', padding: '20px' }}>
                    {/* <p>{form}</p> */}
                    {
                        recivemsg.map((m) => <p style={{ width: 'fit-content', padding: '3px 8px', backgroundColor: 'white' }}>{m}</p>)
                    }
                </div>
            </div>

            <form
                style={{ display: 'flex', flexDirection: 'column', width: '400px', padding: '30px', boxShadow: '0 0 4px 0 rgba(0,0,0,0.25)', margin: '60px 0 0 60px ', borderRadius: '5px' }}
                onSubmit={handlegroupsubmit}>

                <h3>Join Group</h3>

                <TextField
                    variant='standard'
                    label="Group Name"
                    name='groupname'
                    id='groupname'
                    onChange={(e) => setGroupName(e.target.value)} />

                <Button type='submit' variant='contained' style={{ marginTop: '30px' }}>Join Group</Button>

            </form>
        </>
    );
}

export default Chat;
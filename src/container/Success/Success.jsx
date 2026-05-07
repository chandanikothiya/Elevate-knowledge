import { Button } from '@mui/joy';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

function Success(props) {
    return (
        <div className="container">
            <Box sx={{ padding: 4, boxShadow: 1, width: "500px", textAlign: 'center', borderRadius: 2,margin:'0 auto' }}>
                <FaCircleCheck style={{ fontSize: "60px", color: 'green' }} />

                <Typography variant='h5' sx={{ fontWeight: 600, mt: 5, fontSize: '28px' }}>Payment Successfull</Typography>
                <Typography variant='body1' sx={{ mt: 2 }}>your payment has been Successfully
                    processed.now you can go to homepage and descver more courses</Typography>

                <NavLink to={"/"}>
                    <Button sx={{width:'300px',padding:'10px 14px',fontSize:'18px',mt:5}} color="success">
                        Go To Home
                    </Button>
                </NavLink>
            </Box>
        </div>

    );
}

export default Success;
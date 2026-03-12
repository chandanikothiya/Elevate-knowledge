import { Paper, Typography } from '@mui/material';
import React from 'react';

function LineChartData(props) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius:3}}>
            <Typography variant='h6'>
                Sells of diffrent category
            </Typography>
            <Typography variant='subtitle1' sx={{color:'grey'}}>
                (+43%) than last year
            </Typography>
        </Paper>
    );
}

export default LineChartData;
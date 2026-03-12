import { Paper, Typography } from '@mui/material';
import React from 'react';

function BarChartData(props) {
    const Fruits = [
        4000, 3000, 2000, 2780, 1890, 2390, 3490, 2400, 1398, 9800, 3908, 4800,
        3800,
    ];
    const Vegitables = [
        2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 1890,
        2390,
    ];
    const DayFruits = [
        4000, 3000, 2000, 2780, 1890, 2390, 3490, 2400, 1398, 9800, 3908, 4800,
        3800,
    ];
    const OrganicItems = [
        2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 1890,
        2390,
    ];
    const xLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant='h6'>
                Sells of diffrent category
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'grey' }}>
                (+43%) than last year
            </Typography>
        </Paper>
    );
}

export default BarChartData;
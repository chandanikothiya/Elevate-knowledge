import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Paper, Typography } from '@mui/material';


function LineChartData(props) {

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
        <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>
                Orderd trends over time
            </Typography>

            <Typography variant='subtitle1'>
                (+43%) than last year
            </Typography>

            <LineChart
                sx={{ mt: 3, pl: 0 }}
                height={350}
                series={[
                    { data: Fruits, label: 'Fruits' },
                    { data: Vegitables, label: 'Vegitables' },
                    { data: DayFruits, label: 'DayFruits' },
                    { data: OrganicItems, label: 'OrganicItems' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, height: 28, width: 30 }]}
                yAxis={[{ width: 50 }]}
                margin={[{ right: 24 }]}
            />
        </Paper>

    );
}

export default LineChartData;
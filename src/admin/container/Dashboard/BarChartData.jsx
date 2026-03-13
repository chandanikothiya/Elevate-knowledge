import { Paper, Typography } from '@mui/material';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
// import { addLabels, balanceSheet, valueFormatter } from './netflixsBalanceSheet';


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

            <BarChart
                height={350}
                xAxis={[{ scaleType: 'band', data: xLabels }]}
                yAxis={[{ width: 50}]}
                series={[
                    { data: Fruits, label: "Fruits", stack: 'sells' },
                    { data: Vegitables, label: "Vegetables", stack: 'sells' },
                    { data: DayFruits, label: "DayFruits", stack: 'sells' },
                    { data: OrganicItems, label: "OrganicItems", stack: 'sells' }
                ]}
               
                slotProps={{
                    legend: {
                        axisDirection: 'x',
                        markType: 'square',
                        labelPosition: 'inline-start',
                    },
                }}
            />
        </Paper>
    );
}

export default BarChartData;
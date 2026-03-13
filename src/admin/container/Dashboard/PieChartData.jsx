import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Paper, Typography } from '@mui/material';

function PieChartData(props) {

    const orderDistribution = [
        { label: "Delivered", value: 70, color: '#0088FE' },
        { label: "Padding", value: 20, color: '#00C49F' },
        { label: "Cancelled", value: 10, color: '#FFBB28' },
    ];

    const settings = {
        margin: { right: 5 },
        width: 200,
        height: 200,
    };

    return (
        <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant='h6'>
                Order status distribution
            </Typography>

            <Typography variant='subtitle1'>
                (+43%) than last year
            </Typography>

            <PieChart
                series={[{ innerRadius: 50, outerRadius: 100, data: orderDistribution, arcLabel: 'value' }]}
                {...settings}
                sx={{ mt: 6 }}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        sx:{mt:10,fontSize:15,borderTop:'1.5px solid grey',paddingTop:4}
                    },
                    
                }}
            />
        </Paper>
    );
}

export default PieChartData;
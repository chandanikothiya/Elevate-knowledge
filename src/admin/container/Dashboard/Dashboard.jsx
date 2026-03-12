import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LineChartData from './LineChartData';

const stats = [
    {
        title: "Total active users",
        value: "18,765",
        change: "+2.6%",
        status: true,
        color: 'green',
        data: [1, 4, 2, 5, 7, 2, 4, 6],
        dataColor: 'black',
    },
    {
        title: "Total Products",
        value: "4,876",
        change: "+0.2%",
        status: true,
        color: 'black',
        data: [8, 5, 2, 5, 9, 2, 8, 1],
        dataColor: 'black',
    },
    {
        title: "Total Orders",
        value: "678",
        change: "-0.1%",
        status: false,
        color: 'orange',
        data: [1, 4, 2, 5, 7, 2, 4, 6],
        dataColor: 'black',
    },
    {
        title: "Total Revenue Gauge",
        value: "1,234",
        change: "+1.0%",
        status: true,
        color: 'green',
        data: [8, 5, 2, 5, 9, 2, 8, 1],
        dataColor: 'black',
    },
];

//   work as componenet
const Statscard = ({ title, value, change, status, color, data, dataColor }) => {
    const [showHighlight, setShowHighlight] = React.useState(true);
    const [showTooltip, setShowTooltip] = React.useState(true);

    const handleHighlightChange = (event) => {
        setShowHighlight(event.target.checked);
    };

    const handleTooltipChange = (event) => {
        setShowTooltip(event.target.checked);
    };


    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius:3}}>
            <Typography variant='subtitle2'>
                {title}
            </Typography>

            <Grid container sx={{alignItems:'end'}}>
                <Grid size={8}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                        {value}
                    </Typography>
                </Grid>
                <Grid size={4}>
                    <SparkLineChart
                        plotType="bar"
                        data={data}
                        height={60}
                        showHighlight={showHighlight}
                        showTooltip={showTooltip}
                        color={color}
                    />
                </Grid>
            </Grid>

            <Box sx={{display:'flex',color:status ? 'green' : 'black',mt:1}}>
                {status ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}

                <Typography sx={{ml:1}} >
                    {change} last 7 days
                </Typography>
            </Box>
        </Paper>
    )
}


function Dashboard(props) {
    return (
        <>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {
                        stats.map((v) => (
                            // <Statscard data={v} />
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <Statscard {...v} />
                            </Grid>
                        ))
                    }

                    <Grid size={12}>
                        <LineChartData/>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Dashboard;
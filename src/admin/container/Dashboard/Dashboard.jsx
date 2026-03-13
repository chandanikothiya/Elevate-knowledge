import { Avatar, AvatarGroup, Box, Chip, Grid, Paper } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BarChartData from './BarChartData';
import LineChartData from './LineChartData';
import PieChartData from './PieChartData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant='subtitle2'>
                {title}
            </Typography>

            <Grid container sx={{ alignItems: 'end' }}>
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

            <Box sx={{ display: 'flex', color: status ? 'green' : 'black', mt: 1 }}>
                {status ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}

                <Typography sx={{ ml: 1 }} >
                    {change} last 7 days
                </Typography>
            </Box>
        </Paper>
    )
}

const product = [
    {
        _id: 3,
        products_img: "../../../../public/assets/images/avatar/01.jpg",
        name: "ABCD",
        price: "$150",
        total_orders: "280",
        rank: "Top1",
        rankColor: "primary",
    },
    {
        _id: 4,
        products_img: "../../../../public/assets/images/avatar/02.jpg",
        name: "abcd",
        price: "$350",
        total_orders: "50",
        rank: "Top2",
        rankColor: "secondary",
    },
    {
        _id: 5,
        products_img: "../../../../public/assets/images/avatar/03.jpg",
        name: "xyz",
        price: "$150",
        total_orders: "200",
        rank: "Top3",
        rankColor: "error",
    },
    {
        _id: 6,
        products_img: "../../../../public/assets/images/avatar/04.jpg",
        name: "pqr",
        price: "$50",
        total_orders: "300",
        rank: "Top4",
        rankColor: "info",
    },
    {
        _id: 7,
        products_img: "../../../../public/assets/images/avatar/05.jpg",
        name: "ABCD",
        price: "$30",
        total_orders: "250",
        rank: "Top5",
        rankColor: "success",
    },
];

const Bestproduct = ({ data }) => (

    <Paper sx={{ p: 2 }}>

        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', fontSize: '18px', mb: 1 }}>
            Best Products
        </Typography>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#F4F6F8' }}>
                        <TableCell sx={{ color: '#484646', fontSize: '15px' }}>Product Image</TableCell>
                        <TableCell sx={{ color: '#484646', fontSize: '15px' }}>Name</TableCell>
                        <TableCell sx={{ color: '#484646', fontSize: '15px' }}>Price</TableCell>
                        <TableCell sx={{ color: '#484646', fontSize: '15px' }}>Total Orders</TableCell>
                        <TableCell sx={{ color: '#484646', fontSize: '15px' }}>Rank</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((v) => (
                            <TableRow
                                key={v._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Avatar src={v.products_img} />
                                </TableCell>
                                <TableCell>{v.name}</TableCell>
                                <TableCell>{v.price}</TableCell>
                                <TableCell>{v.total_orders}</TableCell>
                                <TableCell>
                                    <Chip label={v.rank} color={v.rankColor} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
)


const latestproducts = [
    {
        _id: 1,
        products_img: "../../../../public/assets/images/avatar/01.jpg",
        name: "product name ",
        price: "$50",
        variant: 3,
        colors: ["#00C49F", "#FFBB28", "#FF8042", "#FFBB28"],
    },
    {
        _id: 2,
        products_img: "../../../../public/assets/images/avatar/01.jpg",
        name: "product name ",
        price: "$50",
        variant: 3,
        colors: ["#8B4513", "#D2B48C"],
    },
    {
        _id: 3,
        products_img: "../../../../public/assets/images/avatar/01.jpg",
        name: "product name ",
        price: "$97.14",
        variant: 3,
        oldPrice: "$97.14",
        discountPrice: "$85.21",
        colors: ["#00C49F", "#00BFFF", "#DC143C", "#FFBB28", "#DC143C"],
    },
    {
        _id: 4,
        products_img: "../../../../public/assets/images/avatar/01.jpg",
        name: "product name ",
        price: "$97",
        variant: 3,
        oldPrice: "$97",
        discountPrice: "$68.71",
        colors: ["#800080", "#4B0082"],
    },
    {
        _id: 5,
        products_img: "../../../../public/assets/images/avatar/01.jpg",
        name: "product name ",
        price: "$50",
        variant: 3,
        colors: ["#00008B"],
    },
];

const Latestproducts = ({ data }) => (
    <Paper sx={{ p: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', fontSize: '18px', mb: 1 }}>
            Latest Products
        </Typography>

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    {
                        data.map((v) => (
                            <TableRow
                                key={v._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', columnGap: 1 }}>
                                        <Avatar src={v.products_img} variant="rounded" />
                                        <Box>
                                            <Typography>{v.name}</Typography>
                                            <Typography variant='span' sx={{ color: v.discountPrice ? 'red' : 'grey', textDecoration: v.discountPrice ? 'line-through' : 'none' }}>
                                                {v.price}
                                            </Typography>
                                            {
                                                v?.discountPrice &&
                                                <Typography variant='span' sx={{ ml: 1, color: 'grey' }}>
                                                    {v.discountPrice}
                                                </Typography>
                                            }

                                        </Box>

                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <AvatarGroup max={4}
                                        sx={{
                                            fontSize: '10px',
                                            '& .MuiAvatar-circular': {
                                                width: '20px', height: '20px',fontSize:'10px'
                                            },
                                        }}
                                    >
                                        {
                                            v.colors.map((v1) => (
                                                <Avatar sx={{ bgcolor: v1, width: '20px', height: '20px',fontSize:'10px' }}> </Avatar>
                                            ))
                                        }
                                    </AvatarGroup>
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>

    </Paper>
)


function Dashboard(props) {
    return (
        <>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {
                        stats?.map((v) => (
                            // <Statscard data={v} />
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <Statscard {...v} />
                            </Grid>
                        ))
                    }

                    <Grid size={12}>
                        <BarChartData />
                    </Grid>


                    <Grid container spacing={2} size={12} >
                        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                            <LineChartData />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ alignItems: 'center' }}>
                            <PieChartData />
                        </Grid>
                    </Grid>

                    <Grid size={8}>
                        <Bestproduct data={product} />
                    </Grid>
                    <Grid size={4}>
                        <Latestproducts data={latestproducts} />
                    </Grid>

                </Grid>
            </Box>
        </>
    );
}

export default Dashboard;
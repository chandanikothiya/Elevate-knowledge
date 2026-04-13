import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, createTheme, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Rating, Stack, ThemeProvider, Typography } from "@mui/material";
import { PiLineVerticalThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { LuTruck } from "react-icons/lu";
import { MdAutorenew } from "react-icons/md";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { useGetCourseQuery } from "../../redux/api/course.api";

function CourseDetail() {

    const [counter, setCounter] = useState(1)
    const [active, setActive] = useState();
    const [selectedImg, setSelectedImg] = useState(null);
    const [firstresnder, setFirstrender] = useState()

    const { data, error, isloading } = useGetCourseQuery();
    console.log(data?.data)

    const { id } = useParams();
    console.log("getid", id)

    const handleIncrese = () => {
        setCounter(counter + 1)
        setActive("increse")
    }

    const handleDecrese = () => {
        if (counter > 0) {
            setCounter(counter - 1)
            setActive("decrese")
        }
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const availableColors = [
        { value: '#E07575', label: 'red' },
        { value: '#8aa8d4', label: 'blue' },
    ];
    const [selectedValue, setSelectedValue] = React.useState(availableColors[0].label);


    const Size = ['XS', 'S', 'M', 'L', 'XL']
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 576,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    const filtercourse = data?.data?.find((v) => v._id === id)
    console.log(filtercourse)




    console.log(selectedImg)
    console.log(selectedImg?.includes('.mp4'))

    const keys = Object.keys(localStorage);
    const subcategoryKeys = keys.filter(key => key.includes("_subcategory"));
    console.log("subcategoryKeys", subcategoryKeys)

    // useEffect(() => {
    //     let isFirstRender = true;

    //     return () => {
    //         if (!isFirstRender) {
    //             localStorage.removeItem('category')
    //             localStorage.removeItem('course')
    //             subcategoryKeys.map((v) => localStorage.removeItem(v))
    //         }
    //         isFirstRender = false;
    //     }
    // }, [isFirstRender])
   

    useEffect(() => {
        if (filtercourse?.course_video) {
            setSelectedImg(filtercourse.course_video?.url);
        }

        // return () => { 
        //         localStorage.removeItem('category')
        //         localStorage.removeItem('course')
        //         subcategoryKeys.map((v) => localStorage.removeItem(v))
        //     }
            
        // }

    }, [filtercourse]);

    return (
        <main>
            <section id="product-detail">
                <div className="container">
                    {/* <Typography><span style={{ color: 'grey' }}>Home / Gaming / </span>Havic HV G-92 Gamepad</Typography> */}

                    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                        <Link underline="hover" color="inherit" href="/">
                            {localStorage.getItem('category')}
                        </Link>
                        {
                            subcategoryKeys.map((v) => (
                                <Link underline="hover" color="inherit" href="/">
                                    {localStorage.getItem(v)}
                                </Link>
                            ))
                        }
                        {/* <Link
                            underline="hover"
                            color="error"
                            href="/material-ui/getting-started/installation/"
                        >
                            {localStorage.getItem('course')}
                        </Link> */}
                        <Typography sx={{ color: 'text.primary' }} className="breadcrumbs-typo">{localStorage.getItem('course')}</Typography>
                    </Breadcrumbs>

                    <Grid container sx={{ mt: { xs: 3, sm: 5, lg: 10 } }} spacing={{ xs: 3, sm: 5, lg: 6 }}>

                        <Grid size={{ xs: 12, sm: 6, lg: 7 }} container spacing={{ xs: 2, sm: 3, xl: 3 }} alignItems="stretch">
                            <Grid size={{ xs: 9, sm: 8, md: 12 }} display="flex">
                                <Box className="detailimg-box deatail-main-img" sx={{ width: '100%', height: '400px' }}>
                                    {
                                        selectedImg?.includes('.mp4') ?
                                            <video width="100%" height='100%' autoPlay
                                                muted
                                                controls
                                                playsInline>
                                                <source src={selectedImg} type="video/mp4"></source>
                                            </video> : <img src={selectedImg} alt="" width='100%' height='100%' />
                                    }

                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{
                                // flexDirection: {
                                //     xs: 'row',     // mobile → row
                                //     md: 'column'   // desktop → column
                                // }
                            }} container spacing={{ sm: 2, md: 4 }} alignSelf="flex-start">
                                <Grid size={{ xs: 3, sm: 3, md: 3 }}>
                                    <Box className="detailimg-box"
                                        onClick={() => setSelectedImg(filtercourse?.course_video?.url)}
                                        sx={{
                                            cursor: "pointer",
                                            border: selectedImg === filtercourse?.course_video?.url ? "2px solid blue" : "none",
                                            height: '117px'
                                        }}
                                    >
                                        <video width="100%" height="100%" controls >
                                            <source src={filtercourse?.course_video?.url} type="video/mp4"></source>
                                        </video>
                                    </Box>
                                </Grid>
                                {
                                    filtercourse?.course_img?.map((v, i) => (
                                        <Grid size={{ xs: 3, sm: 3, md: 3 }}>
                                            <Box className="detailimg-box"
                                                onClick={() => setSelectedImg(v.url)}
                                                sx={{
                                                    cursor: "pointer",
                                                    border: selectedImg === v.url ? "2px solid blue" : "none",
                                                    height: '117px'
                                                }}
                                            >

                                                <img src={v.url} alt="" height='100%' width='100%' />
                                            </Box>
                                        </Grid>
                                    ))
                                }


                            </Grid>

                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '18px', sm: '20px', md: '30px' } }}>{filtercourse?.name}</Typography>

                            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '18px', sm: '20px', md: '24px' }, margin: '18px  0' }}>{filtercourse?.description}</Typography>

                            <ul className="list-inline mb-1" style={{ margin: '20px 0' }}>
                                <li className="list-inline-item h6 fw-light mb-1 mb-sm-0"><i className="far fa-clock text-danger me-2" />{filtercourse?.week_no} Week</li>
                                {/* <li className="list-inline-item h6 fw-light mb-1 mb-sm-0"><i className="fas fa-table text-orange me-2" />82 lectures</li> */}
                                <li className="list-inline-item h6 fw-light"><i className="fas fa-signal text-success me-2" />Beginner</li>
                            </ul>

                            <Typography variant="h5" sx={{ mt: { xs: 2, sm: 1, md: 2 }, mb: { xs: 2, sm: 1, md: 3 }, fontSize: { xs: '20px', sm: '20px', md: '24px' } }}>RS.{filtercourse?.price}</Typography>


                        </Grid>
                    </Grid>

                </div>
            </section>


        </main>
    )
}

export default CourseDetail
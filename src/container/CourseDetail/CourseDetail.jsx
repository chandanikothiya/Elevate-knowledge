import React, { useEffect, useRef, useState } from "react";
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
import { useGetsectionQuery } from "../../redux/api/section.api";
import { useGetcontentQuery } from "../../redux/api/content.api";
import { FaFilePdf } from "react-icons/fa6";


function CourseDetail() {

    const [counter, setCounter] = useState(1)
    const [active, setActive] = useState();
    const [selectedImg, setSelectedImg] = useState(null);
    const [firstresnder, setFirstrender] = useState()
    const [duration, setDuration] = useState(0);
    const videoref = useRef(null)

    const { id } = useParams();
    console.log("getid", id)

    const { data, error, isloading } = useGetCourseQuery();
    console.log(data?.data)

    const { data: sdata, error: serror, isLoading: sisloading } = useGetsectionQuery();
    console.log("sdata", sdata)

    const sdatafilter = sdata?.data?.filter((v) => v.course_id === id).sort((a, b) => a.order_no - b.order_no)
    console.log("sdatafilter", sdatafilter)

    const { data: cdata, error: cerror, isLoading: cisloading } = useGetcontentQuery();
    console.log(cdata)

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

    // if(videoref.current) {
    //     setDuration(videoref.current.duration)
    // }


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

                            <Typography variant="h4" sx={{ fontSize: '15px', margin: '18px  0' }}>{filtercourse?.description
                                .replace(/\. /g, ".\n\n")
                                .split("\n")
                                .map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}</Typography>

                            <ul className="list-inline mb-1" style={{ margin: '20px 0' }}>
                                <li className="list-inline-item h6 fw-light mb-1 mb-sm-0"><i className="far fa-clock text-danger me-2" />{filtercourse?.week_no} Week</li>
                                {/* <li className="list-inline-item h6 fw-light mb-1 mb-sm-0"><i className="fas fa-table text-orange me-2" />82 lectures</li> */}
                                <li className="list-inline-item h6 fw-light"><i className="fas fa-signal text-success me-2" />Beginner</li>
                            </ul>

                            <Typography variant="h5" sx={{ mt: { xs: 2, sm: 1, md: 2 }, mb: { xs: 2, sm: 1, md: 3 }, fontSize: { xs: '20px', sm: '20px', md: '20px' } }}>RS.{filtercourse?.price}</Typography>


                        </Grid>
                    </Grid>
                    {/* sdatafilter */}
                    <Grid container>
                        {/* Curriculum START */}
                        <Grid size={8}>
                            <div className="col-12">
                                <div className="card border rounded-3">
                                    {/* Card header START */}
                                    <div className="card-header border-bottom">
                                        <h4 className="mb-0">Section Wise Content</h4>
                                    </div>
                                    {/* Card header END */}
                                    {/* Card body START */}
                                    <div className="card-body">
                                        <div className="row g-5">
                                            {
                                                sdatafilter?.map((v) => {
                                                    const contentdata = cdata?.data?.filter((v1) => v1.section_id === v._id)
                                                    console.log("contentdata", contentdata)
                                                    return (

                                                        <div className="col-12" >

                                                            <h5 h5 className="mb-4" >{v.name}</h5>

                                                            {
                                                                contentdata?.map((v1) => {

                                                                    const video = v1.content_file.find((v2) => v2.url.includes('video'))
                                                                    console.log(video)

                                                                     const pdf = v1.content_file.find((v2) => v2.url.includes('pdf'))
                                                                    console.log(video)
                                                                    return (
                                                                        <>
                                                                            <div className="d-sm-flex justify-content-sm-between align-items-center">
                                                                                <div className="d-flex">
                                                                                    <a href="#" className="btn btn-danger-soft btn-round mb-0"><i className="fas fa-play" /></a>
                                                                                    <div className="ms-2 ms-sm-3 mt-1 mt-sm-0">
                                                                                        <h6 className="mb-0">{v1.name}</h6>
                                                                                        <p className="mb-2 mb-sm-0 small">{v1.duration}</p>
                                                                                    </div>
                                                                                </div>

                                                                                <a href={video.url} className="btn btn-sm btn-success mb-0" target="_blank" ref={videoref}>Play</a>
                                                                            </div>

                                                                            <div className="d-sm-flex justify-content-sm-between align-items-center mt-4">
                                                                                <div className="d-flex">
                                                                                    <a href="#" className="btn btn-danger-soft btn-round mb-0"><FaFilePdf size={'20px'}/></a>
                                                                                    <div className="ms-2 ms-sm-3 mt-1 mt-sm-0">
                                                                                        <h6 className="mb-0">{v1.name + " " + "pdf"}</h6>
                                                                                        
                                                                                    </div>
                                                                                </div>

                                                                                <a href={pdf.url} className="btn btn-sm btn-success mb-0" target="_blank" ref={videoref}>Open</a>
                                                                            </div>

                                                                            <hr />
                                                                        </>
                                                                    )
                                                                })
                                                            }

                                                        </div>

                                                    )
                                                })
                                            }

                                           
                                            {/* Lecture item END */}
                                            {/* Collapse body START */}
                                            <div className="collapse mt-0" id="collapseCourse">
                                                {/* Lecture item START */}
                                                <div className="col-12 mt-5">
                                                    {/* Curriculum item */}
                                                    <h5 className="mb-4">YouTube Marketing (5 lectures)</h5>
                                                    <div className="d-sm-flex justify-content-sm-between align-items-center">
                                                        <div className="d-flex">
                                                            <a href="#" className="btn btn-danger-soft btn-round mb-0 flex-shrink-0"><i className="fas fa-play" /></a>
                                                            <div className="ms-2 ms-sm-3 mt-1 mt-sm-0">
                                                                <h6 className="mb-0">Video Flow</h6>
                                                                <p className="mb-2 mb-sm-0 small">25m 20s</p>
                                                            </div>
                                                        </div>
                                                        {/* Button */}
                                                        <a href="#" className="btn btn-sm btn-success mb-0">Play</a>
                                                    </div>
                                                    {/* Divider */}
                                                    <hr />
                                                    {/* Curriculum item */}
                                                    <div className="d-sm-flex justify-content-sm-between align-items-center">
                                                        <div className="d-flex">
                                                            <a href="#" className="btn btn-danger-soft btn-round mb-0 flex-shrink-0"><i className="fas fa-play" /></a>
                                                            <div className="ms-2 ms-sm-3 mt-1 mt-sm-0">
                                                                <h6 className="mb-0">Webmaster Tool</h6>
                                                                <p className="mb-2 mb-sm-0 small">15m 20s</p>
                                                            </div>
                                                        </div>
                                                        {/* Button */}
                                                        <a href="#" className="btn btn-sm btn-success mb-0">Play</a>
                                                    </div>
                                                    {/* Divider */}
                                                    <hr />
                                                    {/* Curriculum item */}
                                                    <div className="d-sm-flex justify-content-sm-between align-items-center">
                                                        <div className="d-flex">
                                                            <a href="#" className="btn btn-light btn-round mb-0 flex-shrink-0"><i className="bi bi-lock-fill" /></a>
                                                            <div className="ms-2 ms-sm-3 mt-1 mt-sm-0">
                                                                <h6 className="mb-0">Featured Contents on Channel</h6>
                                                                <p className="mb-2 mb-sm-0 small">32m 26s</p>
                                                            </div>
                                                        </div>
                                                        {/* Button */}
                                                        <a href="#" className="btn btn-sm btn-orange mb-0">Premium</a>
                                                    </div>
                                                    {/* Divider */}
                                                    <hr />
                                                    {/* Curriculum item */}
                                                    <div className="d-sm-flex justify-content-sm-between align-items-center">
                                                        <div className="d-flex">
                                                            <a href="#" className="btn btn-light btn-round mb-0 flex-shrink-0"><i className="bi bi-lock-fill" /></a>
                                                            <div className="ms-2 ms-sm-3 mt-1 mt-sm-0">
                                                                <h6 className="mb-0">Channel Analytics</h6>
                                                                <p className="mb-2 mb-sm-0 small">18m 20s</p>
                                                            </div>
                                                        </div>
                                                        {/* Button */}
                                                        <a href="#" className="btn btn-sm btn-orange mb-0">Premium</a>
                                                    </div>
                                                    {/* Divider */}
                                                    <hr />
                                                    {/* Curriculum item */}
                                                    <div className="d-sm-flex justify-content-sm-between align-items-center">
                                                        <div className="d-flex">
                                                            <a href="#" className="btn btn-light btn-round mb-0 flex-shrink-0"><i className="bi bi-lock-fill" /></a>
                                                            <div className="ms-2 ms-sm-3 mt-1 mt-sm-0">
                                                                <h6 className="mb-0">Managing Comments</h6>
                                                                <p className="mb-2 mb-sm-0 small">20m 20s</p>
                                                            </div>
                                                        </div>
                                                        {/* Button */}
                                                        <a href="#" className="btn btn-sm btn-orange mb-0">Premium</a>
                                                    </div>
                                                </div>
                                                {/* Lecture item END */}
                                            </div>
                                            {/* Collapse body END */}
                                            {/* Collapse button */}
                                            <a className="mb-0 mt-4 btn-more d-flex align-items-center justify-content-center" data-bs-toggle="collapse" href="#collapseCourse" role="button" aria-expanded="false" aria-controls="collapseCourse">
                                                See <span className="see-more mx-1">more</span><span className="see-less mx-1">less</span> video<i className="fas fa-angle-down ms-2" />
                                            </a>
                                        </div>
                                    </div>
                                    {/* Card body START */}
                                </div>
                            </div>

                        </Grid>

                        {/* Curriculum END */}
                    </Grid>


                </div >
            </section >


        </main >
    )
}

export default CourseDetail
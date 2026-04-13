import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory, getparentcategory } from '../../redux/slice/category.slice';
import { IMG_URL } from '../../utility/url';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Container from '@mui/material/Container';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from '@mui/material/Grid';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from "@mui/icons-material/Search";
import Useseacrh from '../../Useseacrh/Useseacrh';
import withReduxFetch from '../../Hoc/withReduxFetch';
import { useNavigate } from 'react-router-dom';


function Categories({ category }) {

    console.log(category)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)

    useEffect(() => {
        dispatch(getcategory());
    }, [])

    console.log("category", categorys.category)
    const x = categorys?.category?.filter((v) => v.parent_category_id === null)

    // let filter = categorys.category.filter((v) => v.name.includes(secarch.toLocaleLowerCase()));
    // console.log(filter)

    const [secarch, setSeacrh, sdata] = Useseacrh(x, ["name", "description"]);

    const handleclick = (id,name) => {
        console.log("idd", id)
        localStorage.setItem("category",name)
        navigate(`/subcategory/${id}`)
    }

    const theme = useTheme();
    return (
        <>
            <Container maxWidth="md">

                <Paper
                    component="form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: 500,
                        mx: "auto",
                        mb: 10,
                        px: 2,
                        py: 0.5,
                        border: '1px solid grey',
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search products..."
                        inputProps={{ "aria-label": "search" }}
                        onChange={(e) => setSeacrh(e.target.value)}
                    />

                    <IconButton type="submit" sx={{ p: "8px" }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Grid container spacing={4}>
                    {sdata?.map((v) => (
                        <Grid key={v._id} size={6}>
                            <Card sx={{ width: "100%", position: 'relative' }} onClick={(e) => handleclick(v._id,v.name)}>
                                <CardMedia
                                    sx={{ height: 250 }}
                                    image={v.category_img?.url || ""}

                                />
                                <CardContent>
                                    <Typography variant="h5">
                                        {v.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {v.description}
                                    </Typography>

                                </CardContent>

                                <CardActions sx={{ position: 'absolute', top: 0, right: 0 }}>
                                    <Button size="small" ><FavoriteBorderOutlinedIcon sx={{ color: "black", fontSize: '30px', borderRadius: '50%', boxShadow: 2, bgcolor: 'white' }} /></Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </>
    );
}

export default withReduxFetch(Categories, getparentcategory, (state) => state.category);
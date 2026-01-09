import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory } from '../../redux/slice/category.slice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addfavourite, getfav } from '../../redux/slice/favcategory.slice';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Categorys(props) {

    const dispatch = useDispatch();
    const c = useSelector(state => state.favcategory)
    console.log(c.favourite)

    const categorys = useSelector(state => state.category)
    console.log(categorys.category)

    function getdata() {
        dispatch(getfav())
    }

    useEffect(() => {
        dispatch(getcategory())
        getdata()
    }, [])

    const handlefav = (id) => {
        console.log("ok", id);
        dispatch(addfavourite(id))
    }

    return (
        <>
            <Container fixed>
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                        gap: 5,
                    }}
                >
                    {
                        categorys.category.map((v) => {

                            return <Card sx={{ maxWidth: 345 }} style={{ position: 'relative', overflow: 'visible' }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image={"../public/images/" + v.categoryimg}
                                    style={{ objectFit: 'cover' }}
                                />
                                <CardContent>

                                    <IconButton aria-label="fav"
                                        style={{ position: 'absolute', top: '-8%', right: '-8%', zIndex: '9999' }}
                                        onClick={(e) => handlefav(v.id)}>
                                        {
                                            c.favourite.includes(v.id) ? <FavoriteIcon style={{ fontSize: '35px',color:'red' }} /> : <FavoriteBorderIcon style={{ fontSize: '35px' }} />
                                        }

                                    </IconButton>

                                    <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '22px' }}>
                                        {v.name}
                                    </Typography>
                                </CardContent>

                            </Card>
                        })
                    }
                </Box>
            </Container>
        </>
    );
}

export default Categorys;
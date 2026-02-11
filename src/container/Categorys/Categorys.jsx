import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory, getparentcategory } from '../../redux/slice/category.slice';
import { IMG_URL } from '../../utility/url';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Container from '@mui/material/Container';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Categorys(props) {

    const dispatch = useDispatch();

    const categorys = useSelector(state => state.category)
    console.log(categorys.category)

    useEffect(() => {
        dispatch(getparentcategory())
    }, [])

    const theme = useTheme();
    return (
        <>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {categorys.category.map((v) => (
                        <Card
                            key={v._id}
                            sx={{
                                display: 'flex',
                                borderRadius: 3,
                                boxShadow: 2,
                                overflow: 'hidden',
                                minHeight: 250,
                            }}

                            style={{position:'relative'}}
                        >
                            {/* LEFT IMAGE */}
                            <CardMedia
                                component="img"
                                image={IMG_URL + v.category_img}
                                alt={v.name}
                                sx={{
                                    width: 280,
                                    height: 250,
                                    objectFit: 'cover',
                                }}
                            />

                            {/* RIGHT CONTENT */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <CardContent>
                                    <Typography variant="h5" fontWeight="600">
                                        {v.name}
                                    </Typography>

                                    <IconButton style={{position:'absolute',top:'10px',right:'0'}}>
                                        <FavoriteBorderIcon />
                                    </IconButton>

                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'text.secondary', mt: 1 }}
                                    >
                                        {v.description}
                                    </Typography>

                                </CardContent>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Container>

        </>
    );
}

export default Categorys;
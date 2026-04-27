import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetquizQuery } from '../../redux/api/quiz.api';
import { useGetquestionQuery } from '../../redux/api/question.api';
import { Box, Button, Grid, Typography } from '@mui/material';

function Quize(props) {

    const { id } = useParams();
    console.log("Quiz ID:", id);

    const { data: qdata, error: qerror, isLoading: qisloding } = useGetquizQuery();

    const quiz = qdata?.data?.find((v) => v.section_id === id)
    console.log(quiz, quiz?._id)

    const { data, error, isLoading } = useGetquestionQuery();

    const question = data?.data?.find((v) => v.quiz_id === quiz?._id)
    console.log(question)
    return (
        <div>
            <div>
                <div className="container">
                    {/* <h1>quize hhh</h1> */}


                    <Box sx={{ p: 5, width: '850px', boxShadow: 1,backgroundColor:'#2D3748',color:'white',borderRadius:2 }}>

                        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>1.{question?.questions?.[0]?.question} ?</Typography>
                        <Grid container sx={{marginTop:2}} spacing={2}>
                            {
                                question?.questions?.[0]?.options?.map((v,i) => (
                                    <Grid size={6} sx={{backgroundColor:'#565e6e',p:2,borderRadius:1}}>
                                        <Typography>{i+1. + " " + v}</Typography>
                                    </Grid>
                                ))
                            }

                        </Grid>
                        <Button variant="contained"  sx={{p:'8px 16px',marginTop:5,backgroundColor:'#04AA6D'}}>Submit Answer</Button>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Quize;
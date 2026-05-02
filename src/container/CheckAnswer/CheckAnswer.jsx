import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetquizQuery } from '../../redux/api/quiz.api';
import { useGetquestionQuery } from '../../redux/api/question.api';
import { Box, Divider, Typography } from '@mui/material';

function CheckAnswer(props) {

    const { id } = useParams();
    const location = useLocation();
    const data = location.state;

    const { data: qdata, error: qerror, isLoading: qisloding } = useGetquizQuery();

    const quiz = qdata?.data?.find((v) => v.section_id === id)
    console.log(quiz, quiz?._id)

    const { data: dataq, error: errorq, isLoading: isloadingq } = useGetquestionQuery();
    console.log(dataq)

    const question = dataq?.data?.find((v) => v.quiz_id === quiz?._id)
    console.log(question);


    console.log("data", data)

    return (
        <div className='container'>
            <Box sx={{ width: '700px', margin: '0 auto' }}>

                {
                    question?.questions?.map((v, i) => (
                        <>
                            <Typography sx={{ fontSize: '22px', fontWeight: 600, mt:2 }}>Question {i + 1}.</Typography>
                            <Typography variant='body1' sx={{ mt: 1 }}>{v?.question}</Typography>

                            {
                                v?.options?.map((v1, i1) => {

                                    let color = '#f1f1f1';

                                        if (v1 === v.answer) {
                                            color = '#bce5d6'
                                        }

                                    if (v1 === data[i] && data[i] !== v.answer) {
                                        color = '#ffcccc';

                                    }
                                    return (
                                        <Box sx={{ mt: 1 }}>
                                            <Typography sx={{ background: color, padding: '8px 35px', mt: '5px' }}>{v1}</Typography>
                                        </Box>
                                    )
                                })
                            }
                            <Divider sx={{margin:'20px 0'}}/>
                        </>
                    ))
                }
            </Box>

        </div>
    );
}

export default CheckAnswer;
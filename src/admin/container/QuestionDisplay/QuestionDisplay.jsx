import React from 'react';
import { useGetquestionQuery } from '../../../redux/api/question.api';
import { useParams } from 'react-router-dom';
import { Box, Divider, Grid, Typography } from '@mui/material';

function QuestionDisplay(props) {
    const { id } = useParams();
    const { data, error, isLoading } = useGetquestionQuery();
    const qfilter = data?.data?.filter((v) => v.quiz_id === id)
    console.log("qfilte", qfilter, data)
    return (
        <div>
            <Box sx={{ width: '1000px', margin: '0 auto', marginTop: 5 }}>
                {
                    qfilter?.[0]?.questions?.map((v, i) => {

                        return (
                            <>
                                <Box>
                                    <Typography variant='' sx={{ fontSize: '18px', fontWeight: 600 }}>{i + 1 + '.'}{v.question + " " + "?"}</Typography>
                                    <Grid container sx={{ marginTop: 1, marginBottom: 1 }} spacing={1}>
                                        {
                                            v?.options?.map((v, i) => (
                                                <Grid size={6}>
                                                    <Typography>Option {i + 1}: {v}</Typography>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                    <Typography variant=''><span style={{ fontSize: '18px', fontWeight: 600 }}>Answer :</span> {v.answer}</Typography>
                                </Box>
                                <Divider sx={{ margin: '20px 0' }} />
                            </>
                        )
                    })
                }

            </Box>
        </div>
    );
}

export default QuestionDisplay;
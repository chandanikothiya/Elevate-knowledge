import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetquizQuery } from '../../redux/api/quiz.api';
import { useGetquestionQuery } from '../../redux/api/question.api';
import { Box, Button, Grid, Typography } from '@mui/material';

function Quize(props) {

    const navigate = useNavigate()
    const { id } = useParams();
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState();
    const [marks, setMarks] = useState(0);
    const [result, setResult] = useState(false);
    const [answers,setAnswers] = useState({})
    console.log("Quiz ID:", id);

    const { data: qdata, error: qerror, isLoading: qisloding } = useGetquizQuery();

    const quiz = qdata?.data?.find((v) => v.section_id === id)
    console.log(quiz, quiz?._id)

    const { data, error, isLoading } = useGetquestionQuery();
    console.log(data)

    const question = data?.data?.find((v) => v.quiz_id === quiz?._id)
    console.log(question);

    const length = question?.questions.length;
    console.log(length)

    let iserror = false;

    const handlesubmit = () => {
        if (answer) {

            if (answer === question?.questions?.[index]?.answer) {
                console.log('yes')
                setMarks(marks + 1)
            }

            if (index < length - 1) {
                setIndex(index + 1)
            } else if (index === length - 1) {
                setResult(true)
            }
        } else {
            iserror = true;
        }
    }

    console.log('yes', answer, marks, iserror, result)

    const handleSelect = (i,opt) => {
        console.log("Answers",i,opt)
        setAnswers((prev) => ({
            ...prev,
            [i]:opt
        }))
    }
    console.log("Answers",answers)

    const handlecheckanswer = () => {
        navigate(`/quizresult/${id}`,{state:answers})
    }

    return (
        <div>
            <div>
                <div className="container">
                    {/* <h1>quize hhh</h1> */}

                    {
                        result ?
                            <Box sx={{textAlign:'center'}}>
                                <Typography variant='h4'>Result :</Typography>
                                <Typography sx={{mt:2,mb:2}} variant='h6'>{marks} of {length}</Typography>
                                <Typography sx={{mt:2,mb:2}} variant='h6'>{marks / length * 100}%</Typography>
                                <Box>
                                    <Button variant="contained"  sx={{ p: '8px 16px', backgroundColor: '#04AA6D' }} onClick={() => handlecheckanswer()}>Check Your Answer</Button>
                                    <Button variant="contained" sx={{ p: '8px 16px',ml:3}} onClick={() => {
                                        setResult(false)
                                        setIndex(0)
                                        setMarks(0)
                                        setAnswer(null)
                                        setAnswers({})
                                        }}>Try Again</Button>
                                </Box>
                            </Box>
                             :

                            <Box sx={{ p: 5, width: '850px', boxShadow: 1, backgroundColor: '#2D3748', color: 'white', borderRadius: 2, margin: '0 auto' }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{index + 1 + ". " + question?.questions?.[index]?.question} ?</Typography>
                                <Grid container sx={{ marginTop: 2 }} spacing={2}>
                                    {
                                        question?.questions?.[index]?.options?.map((v, i) => (
                                            <Grid size={6} sx={{
                                                backgroundColor: '#565e6e', p: 2, borderRadius: 1,
                                                border: answer === v ? 'solid 2px #04AA6D' : ''
                                            }} onClick={() => {setAnswer(v),handleSelect(index,v)}} >
                                                <Typography sx={{ cursor: 'default' }} >{i + 1. + " " + v}</Typography>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                {iserror ? 'selectd answer' : ''}
                                <Button variant="contained"
                                    sx={{ p: '8px 16px', marginTop: 5, backgroundColor: '#04AA6D' }}
                                    onClick={handlesubmit}>
                                    {"Next ❯"}
                                </Button>
                            </Box>
                    }
                </div>
            </div>
        </div>
    );
}

export default Quize;
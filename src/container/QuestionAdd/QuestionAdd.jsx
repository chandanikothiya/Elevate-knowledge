import React, { useState } from 'react';
import { useAddquestionMutation, useDeletequestionMutation, useEditquestionMutation, useGetquestionQuery } from '../../redux/api/question.api';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import MyTextField from '../../admin/components/MyTextField/MyTextField';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { setalert } from '../../redux/slice/alert.slice';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function QuestionAdd(props) {

    const [open, setOpen] = React.useState(false);
    const [updatequestion, setUpdateQuestion] = useState({});
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, error, isLoading } = useGetquestionQuery();
    const qfilter = data?.data?.filter((v) => v.quiz_id === id)
    console.log("qfilte", qfilter, data)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleedit = (values, _id, q_id) => {
        console.log('updatequestion', values, _id, q_id, values.
            options[0])
        const obj = {
            "question": values.question,
            "option1": values.options[0],
            "option2": values.options[1],
            "option3": values.options[2],
            "option4": values.options[3],
            "answer": values.answer,
            // "_id":_id,
            // "quizid":q_id,
            "questionid": values._id
        }
        setUpdateQuestion(obj)
    }


    const [addquestion] = useAddquestionMutation()
    const [editquestion] = useEditquestionMutation()
    const [deletequestion] = useDeletequestionMutation();

    let questionschema = object({
        question: string().required(),
        option1: string().required(),
        option2: string().required(),
        option3: string().required(),
        option4: string().required(),
        answer: string().required(),
    })

    const handleSubmitq = async (values) => {
        console.log("updatequestion", values, updatequestion.questionid)
        try {
            if (Object.keys(updatequestion).length > 0) {
                console.log("yes")
                //console("qid",updatequestion.questionid)
                const qid = updatequestion.questionid;
                editquestion({ ...values, "_id": qfilter?.[0]._id, "quizid": qfilter?.[0].quiz_id, "questionid": qid })
                setUpdateQuestion("")
            } else {
                const response = await addquestion({ ...values, quiz_id: id });
                // if (response.data.success) {
                //     dispatch(setalert({ text: response.data.message, variant: 'success' }))
                // }
            }

        } catch (error) {
            console.log(error)
            // dispatch(setalert({ text: error.data.message, variant: 'error' }))
        }
    }

    const handledelete = (qu_id, _id, q_id) => {
        console.log("delete", qu_id, _id, q_id)

        const obj = { "_id": _id, "quizid": q_id, "questionid": qu_id }
        deletequestion(obj)
    }
    console.log('updatequestion', updatequestion)

    return (
        <div>

            <Formik
                initialValues={Object.keys(updatequestion).length > 0 ? updatequestion : {
                    question: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    answer: ""
                }}
                validationSchema={questionschema}
                enableReinitialize='true'
                onSubmit={(values, { resetForm }) => {
                    console.log("valuesvalues", values)
                    handleSubmitq(values);

                    resetForm();
                }}
            >
                {(props) => {
                    return (<Form style={{ width: '950px', boxShadow: '0 0 4px 0 rgba(0,0,0,0.25)', padding: '10px 40px', margin: '0 auto' }}>
                        <Typography variant='h6'>Add Question</Typography>
                        <MyTextField
                            name="question"
                            id="question"
                            label="Enter Question Name"
                        />

                        <label style={{ marginTop: '20px' }}>Enter Four Option</label>

                        <Box sx={{ display: 'flex', gap: '30px' }}>
                            <MyTextField
                                name="option1"
                                id="option1"
                                label="Enter Option1"
                            />

                            <MyTextField
                                name="option2"
                                id="option2"
                                label="Enter Option2"
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: '30px' }}>
                            <MyTextField
                                name="option3"
                                id="option3"
                                label="Enter Option3"
                            />

                            <MyTextField
                                name="option4"
                                id="option4"
                                label="Enter Option4"
                            />
                        </Box>

                        <MyTextField
                            name="answer"
                            id="answer"
                            label="Enter Correct Answer"
                        />

                        <Box sx={{ marginTop: "20px", display: 'flex', justifyContent: 'flex-end' }}>
                            <Button>Cancel</Button>
                            <Button type="submit">
                                Add Question
                            </Button>
                        </Box>


                    </Form>)
                }}
            </Formik>

            <Box sx={{ width: '950px', margin: '0 auto', marginTop: 5 }}>
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
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant=''><span style={{ fontSize: '18px', fontWeight: 600 }}>Answer :</span> {v.answer}</Typography>
                                        <Box >
                                            <IconButton onClick={() => handleedit(v, qfilter?.[0]._id, qfilter?.[0].quiz_id)}>
                                                <EditIcon sx={{ color: 'blue' }} />
                                            </IconButton>
                                            <IconButton onClick={() => handledelete(v._id, qfilter?.[0]._id, qfilter?.[0].quiz_id)}>
                                                <DeleteIcon sx={{ color: 'red' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
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

export default QuestionAdd;
import React, { useEffect, useState } from 'react';
import UploadFile from '../../components/UploadFile/UploadFile';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useAdddemoMutation } from '../../../redux/api/demo.api';


function Demo(props) {
    const [open, setOpen] = React.useState(false);
    const [inputcount, setInputcount] = useState(1)
    const [adddemo] = useAdddemoMutation()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handlesubmit(values) {
        console.log("values", values)

        const formdata = new FormData();
        //formdata.append("demo_img", values.demo_img);

        // if (typeof values.demo_img instanceof File) {
        //     formdata.append("demo_img", values.demo_img);
        // }
        for (let key in values) {
            console.log(key)
            if (key.startsWith("demo_img") && values[key]) {
                formdata.append("demo_img", values[key]);
            }
            else if (key === 'demo_video' && values[key]) {
                console.log("in videro",formdata)
                formdata.append("demo_video", values[key]);

            }
        }
        console.log(formdata)
        adddemo(formdata)
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Course</DialogTitle>
                <DialogContent>

                    <Formik
                        initialValues={{

                            // course_img: [],
                            demo_video: ""
                        }}
                        //validationSchema={courseSchema}
                        onSubmit={(values, { resetForm }) => {
                            console.log("fval", values)
                            handlesubmit(values)

                            handleClose();
                            resetForm();
                        }}
                    >
                        {({ values }) => {
                            console.log("valuesvalues", values)
                            return (<Form id="subscription-form">


                                {/* <UploadFile
                                    name='demo_img'
                                    label="upload image"
                                /> */}



                                {Array.from(Array(inputcount)).map((c, index) => {
                                    console.log("one", c, index)
                                    return (
                                        <>
                                            <div style={{ display: 'flex' }}>
                                                <UploadFile
                                                    name={`demo_img_${index}`}
                                                    label="upload images"
                                                />
                                                <Button sx={{ bgcolor: '#ced4da', padding: '6px', minWidth: '40px', ml: 2 }} onClick={() => setInputcount(inputcount + 1)}>+</Button>
                                                {
                                                    index > 0 && <Button sx={{ bgcolor: '#ced4da', padding: '6px', minWidth: '40px', ml: 2 }} onClick={() => setInputcount(inputcount - 1)}>-</Button>

                                                }
                                            </div>
                                        </>
                                    )
                                })}

                                <UploadFile
                                    name='demo_video'
                                    label="uplaod video"
                                />

                            </Form>)
                        }}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Add Course
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Demo;
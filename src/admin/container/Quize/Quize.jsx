import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Form, Formik } from 'formik';
import MyTextField from '../../components/MyTextField/MyTextField';
import UploadFile from '../../components/UploadFile/UploadFile';
import { object, string, mixed, number } from 'yup';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, deletecategory, editcategory, getcategory } from '../../../redux/slice/category.slice';
import { IMG_URL } from '../../../utility/url';
import { useDeleteCourseMutation, useGetCourseQuery } from '../../../redux/api/course.api';
import { useAddsectionMutation, useDeletesectionMutation, useEditsectionMutation, useGetsectionQuery } from '../../../redux/api/section.api';
import { useAddquizMutation, useDeletequizMutation, useEditquizMutation, useGetquizQuery } from '../../../redux/api/quiz.api';
import { MdQuiz } from "react-icons/md";
import { Box } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { useAddquestionMutation } from '../../../redux/api/question.api';
import { useNavigate } from 'react-router-dom';


function Quize(props) {

    const [open, setOpen] = React.useState(false);
    const [openq, setOpenq] = React.useState(false);
    const [categorydata, setCategoryData] = useState([]);
    const [updatecategory, setUpdateCategory] = useState({});
    const [quizid,setQuizeid] = useState();
    const [courseid, setCourseid] = useState('');
    const courseref = useRef(null);
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    // console.log("addda", categorys.category);
    console.log(categorys)
    // console.log(categorydata);

    const { data, error, isLoading } = useGetCourseQuery();
    console.log("cdata", data);

    const { data: sdata, error: serror, isLoading: sisloading } = useGetsectionQuery();
    console.log("ref", sdata?.data)
    const sfilter = sdata?.data?.filter((v) => v.course_id === courseid)
    console.log("ref", sfilter)

    let cdata = [
        { value: '', label: 'Select Course' }
    ];

    data?.data?.map((v, i) => {
        // if (v !== null) {
        console.log(v?._id)

        cdata.push({ value: v?._id, label: v?.name })
        // }
    })
    console.log(cdata)

    let sectiondata = [
        { value: '', label: 'Select Section' }
    ];

    sfilter?.map((v, i) => {
        // if (v !== null) {
        console.log(v?._id)
        sectiondata.push({ value: v?._id, label: v?.name })
        // }
    })

    //quize api
    const [addquiz] = useAddquizMutation();
    const { data: qdata, error: qerror, isLoading: qisLoading } = useGetquizQuery();
    console.log("qdata", qdata)
    const [editquiz] = useEditquizMutation();
    const [deletequiz] = useDeletequizMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenq = () => {
        setOpenq(true);
    };

    const handleCloseq = () => {
        setOpenq(false);
    };

    const getdata = async () => {
        // const response = await fetch("http://localhost:3000/category");
        // const data = await response.json();
        // setCategoryData(data);

        dispatch(getcategory())
    }

    useEffect(() => {
        getdata();
    }, []);

    let categoryschema = object({
        //course_id: string().required(),
        section_id: string().required(),
        name: string().required(),
        description: string().required(),
        time: string().required()
        // .test("categoryimg","only jpeg,png,jpg",function(value) {
        //     const arr = ['image/jpeg','image/png','image/jpg']
        //     console.log(value);
        //     return value.includes(arr);

        // }),
        // parentcategory:string().required()
    })

    // console.log(categoryschema);

    const handleSubmit = async (values) => {
        console.log("vvvv", values)
        try {
            if (Object.keys(updatecategory).length > 0) {

                editquiz(values)
                setUpdateCategory({});

            } else {

                console.log("vvv", values);
                addquiz(values)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (data) => {
        console.log("updatedata", data);

        handleClickOpen();
        setUpdateCategory(data)
        setCourseid(data.course_id)
    }

    const handleDelete = async (id) => {
        deletequiz(id)
    }

    const columns = [
        { field: "name", headerName: 'name', width: 180 },
        { field: "description", headerName: 'description', width: 200 },

        {
            field: "course_id", headerName: 'course', width: 180,
            renderCell: (params) => (
                <>
                    {console.log(params, params.row.course_id)}
                    {params.row.course_id !== null && data?.data?.find((v) => v._id === params.row.course_id).name}
                    {/* {
                       categorys.category.find((v) => v._id === params.row.parent_category_id)
                    } */}
                </>
            )
        },
        {
            field: "section_id", headerName: 'section', width: 180,
            renderCell: (params) => (
                <>
                    {console.log(params, params.row.course_id)}
                    {params.row.section_id !== null && sdata?.data?.find((v) => v._id === params.row.section_id).name}
                    {/* {
                       categorys.category.find((v) => v._id === params.row.parent_category_id)
                    } */}
                </>
            )
        },
        { field: "time", headerName: 'time', width: 100 },
        {
            field: 'Action', headerName: 'Action', width: 200,
            renderCell: (params) => (
                <>
                    {console.log(params, params.id)}
                    <IconButton aria-label="delete"
                        onClick={(e) => handleEdit(params.row)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                        onClick={(e) => handleDelete(params.row._id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
        {
            field: '', headerName: 'Quize Action', width: 350,
            renderCell: (params) => (
                <>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
                        <Button color="warning" variant="contained" startIcon={<MdQuiz />} onClick={() => {navigate(`/admin/questionadd/${params.row._id}`)}}>
                            Add Question
                        </Button>

                        <Button color="success" variant="contained" startIcon={<FaEye />} onClick={() => {navigate(`/admin/questiondisplay/${params.row._id}`)}}>
                            See Questions
                        </Button>
                    </Box>

                </>
            )
        },

    ]
    const paginationModel = { page: 0, pageSize: 5 };

    const handleChange = (e) => {

        // console.log("ref",typeof e.target.value,e.target.innerText);
        // setCourseid(e.target.value)
    }
    console.log("ref", courseid)

    

   

    

    return (
        <>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Quiz
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Quize</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(updatecategory).length > 0 ? updatecategory : {

                                course_id: '',
                                section_id: "",
                                name: "",
                                description: "",
                                time: ""
                            }}
                            validationSchema={categoryschema}
                            onSubmit={(values, { resetForm }) => {
                                console.log("valuesvalues", values)
                                handleSubmit(values);

                                handleClose();
                                resetForm();
                            }}
                        >
                            {(props) => {
                                return (<Form>
                                    <MyTextField
                                        name="course_id"
                                        id="courseid"
                                        label="Select Course"
                                        select
                                        data={cdata}
                                        value={props.values.course_id}
                                        InputLabelProps={{ shrink: true, required: true }}
                                        slotProps={{
                                            select: {
                                                native: true,
                                            },
                                        }}
                                        //ref={courseref}


                                        onChange={(e) => {
                                            props.handleChange(e);
                                            setCourseid(e.target.value)
                                        }}
                                    />

                                    <MyTextField
                                        name="section_id"
                                        id="sectionid"
                                        label="Select Section"
                                        select
                                        data={sectiondata}
                                        InputLabelProps={{ shrink: true, required: true }}
                                        slotProps={{
                                            select: {
                                                native: true,
                                            },
                                        }}

                                    />

                                    <MyTextField
                                        name="name"
                                        id="name"
                                        label="Quiz Name"
                                    />

                                    <MyTextField
                                        name="description"
                                        id="description"
                                        label="Description"
                                    />


                                    <MyTextField
                                        name="time"
                                        id="time"
                                        label="Time"
                                    />

                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">
                                            Add Quize
                                        </Button>
                                    </DialogActions>
                                </Form>)
                            }}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </React.Fragment>

            <DataGrid
                rows={qdata?.data}
                getRowId={(row) => row?._id || Math.random()}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />

            {/* <Dialog open={openq} onClose={handleCloseq}>
                <DialogTitle>Quize Question</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            questionname: "",
                            option1: "",
                            option2: "",
                            option3: "",
                            option4: "",
                            answer: ""
                        }}
                        validationSchema={questionschema}
                        onSubmit={(values, { resetForm }) => {
                            console.log("valuesvalues", values)
                            handleSubmitq(values);
                            handleCloseq();
                            resetForm();
                        }}
                    >
                        {(props) => {
                            return (<Form>

                                <MyTextField
                                    name="questionname"
                                    id="questionname"
                                    label="Enter Question Name"
                                />

                                <label style={{ marginTop: '20px' }}>Enter Four Option</label>

                                <MyTextField
                                    name="option1"
                                    id="option1"
                                    label="Enter Option1"
                                    sx={{ marginTop: '0px' }}
                                />

                                <MyTextField
                                    name="option2"
                                    id="option2"
                                    label="Enter Option2"
                                />

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

                                <MyTextField
                                    name="answer"
                                    id="answer"
                                    label="Enter Correct Answer"
                                />

                                <DialogActions>
                                    <Button onClick={handleCloseq}>Cancel</Button>
                                    <Button type="submit">
                                        Add Question
                                    </Button>
                                </DialogActions>
                            </Form>)
                        }}
                    </Formik>
                </DialogContent>
            </Dialog> */}
        </>
    );
}

export default Quize;
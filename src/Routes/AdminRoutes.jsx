import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/components/Layout/Layout';
import Dashboard from '../admin/container/Dashboard/Dashboard';
import Category from '../admin/container/Category/Category';
import SubCategory from '../admin/container/Subcategory/SubCategory';
import Course from '../admin/container/Course/Course';

import { ThemeContext } from '../Context/ThemeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Demo from '../admin/container/Demo/Demo';
import Section from '../admin/container/Section/Section';
import Content from '../admin/container/Content/Content';
import Quize from '../admin/container/Quize/Quize';
import QuestionAdd from '../container/QuestionAdd/QuestionAdd';
import QuestionDisplay from '../admin/container/QuestionDisplay/QuestionDisplay';
import Coupon from '../admin/container/Coupon/Coupon';


function AdminRoutes(props) {

    const themecontext = useContext(ThemeContext);

    console.log(themecontext);
    

    const theme = createTheme({
        palette: {
            mode: themecontext.theme,
            primary: {
                main: '#066ac9'
            },
            secondary: {
                main: '#f7c32e'
            },
        },
    });
//     const theme = createTheme({
//   palette: {
//     mode: themecontext.theme,
//     primary: {

//       main: '#FF5733',
//       // light: will be calculated from palette.primary.main,
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       main: '#E0C2FF',
//       light: '#F5EBFF',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#47008F',
//     },
//   },
// });

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Routes>
                    <Route path='/' element={<Dashboard />}/>
                    <Route path='/category' element={<Category />}/>
                    <Route path='/subcategory' element={<SubCategory />}/>
                    <Route path='/course' element={<Course />}/>
                    <Route path='/demo' element={<Demo />}/>
                    <Route path='/section' element={<Section />}/>
                    <Route path='/content' element={<Content />}/>
                    <Route path='/quize' element={<Quize />}/>
                    <Route path='/questionadd/:id' element={<QuestionAdd />} />
                    <Route path='/questiondisplay/:id' element={<QuestionDisplay />} />
                    <Route path='/coupon' element={<Coupon />} />
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}

export default AdminRoutes;
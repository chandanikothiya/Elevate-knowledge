import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/components/Layout/Layout';
import Dashboard from '../admin/container/Dashboard/Dashboard';
import Category from '../admin/container/Category/Category';
import SubCategory from '../admin/container/Subcategory/SubCategory';
import Course from '../admin/container/Course/Course';


function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/category' element={<Category />}></Route>
                <Route path='/subcategory' element={<SubCategory />}></Route>
                <Route path='/course' element={<Course />}></Route>
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;
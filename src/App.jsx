import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './container/Home/Home';
import Layout from './admin/components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './admin/container/Dashboard/Dashboard';
import Category from './admin/container/Category/Category';
import SubCategory from './admin/container/Subcategory/SubCategory';
import Course from './admin/container/Course/Course';
import About from './container/About/About';

function App(props) {
  return (
    <div>

      {/* <Layout>
        <Routes>
          <Route path='/admin/dashboard' element={<Dashboard />}></Route>
          <Route path='/admin/category' element={<Category />}></Route>
          <Route path='/admin/subcategory' element={<SubCategory />}></Route>
          <Route path='/admin/course' element={<Course />}></Route>
        </Routes>
      </Layout> */}

      <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
          </Routes>
      <Footer />

    </div>
  );
}

export default App;
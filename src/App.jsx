import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRoutes from './Routes/AdminRoutes';
import UserRoutes from './Routes/UserRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';

function App(props) {
  return (
    <Routes>
      <Route path='/*' element={<UserRoutes />} />

      <Route element={<PrivateRoutes/>}>
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Route>

      
    </Routes>
  );
}

export default App;
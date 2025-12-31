import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRoutes from './Routes/AdminRoutes';
import UserRoutes from './Routes/UserRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import { Provider } from 'react-redux';
import { storeconfig } from './redux/store';


function App(props) {

  const store = storeconfig()
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/*' element={<UserRoutes />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Route>


      </Routes>
    </Provider>
  );
}

export default App;
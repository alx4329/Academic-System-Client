import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './containers/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import AdminRoutes from './components/AdminRoutes';
import React from 'react';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Navbar from './components/Navbar/Navbar';
import NewCareer from './containers/NewCareer/NewCareer';

function App() {


  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>              
            <Route path='/' element={<Navbar/>}/>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/' element={<AdminRoutes/>}>
              <Route exact path='/register' element={[<Navbar/>,<Register/>]}/>
              <Route exact path='/newCareer' element={[<Navbar/>,<NewCareer/>]}/>
            </Route>
          </Route>
        <Route exact path='/login' element={<Login/>}/>
        </Routes>
          
      
    </Router>
    
  );
}

export default App;

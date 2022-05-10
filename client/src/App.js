import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './containers/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Navbar from './components/Navbar/Navbar';
function App() {


  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
              
              <Route path='/' element={<Navbar/>}/>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/register' element={[<Navbar/>,<Register/>]}/>
          </Route>
        <Route exact path='/login' element={<Login/>}/>
        </Routes>
          
      
    </Router>
    
  );
}

export default App;

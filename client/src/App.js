import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './containers/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import Home from './containers/Home/Home';
function App() {


  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<Home/>}/>
          </Route>
        {/* <Route exact path='/register' element={<Register/>}/> */}
        <Route exact path='/login' element={<Login/>}/>
        </Routes>
          
      
    </Router>
    
  );
}

export default App;

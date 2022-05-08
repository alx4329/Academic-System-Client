import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import Login from './containers/Login/Login';
import routes from './config/routes';
import { useSelector } from "react-redux";
import PrivateRoute from './components/PrivateRoute';
import React from 'react';
import Home from './containers/Home/Home';
function App() {

  // {routes.map((route) =>  

    // <AppRoute
    //   key={route.path}
    //   path={route.path}
    //   component={route.component}
    //   isPrivate={route.isPrivate}
    // />
  
// )}
  return (
    
    
    <Router>
      {/* <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes> */}
      
          
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

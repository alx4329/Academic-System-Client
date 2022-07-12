import { configureStore} from '@reduxjs/toolkit'
import authSlice from "../reducer/authReducer.js";
import careerSlice from "../reducer/careerReducer.js";
import usersReducer from '../reducer/usersReducer.js';

const store =configureStore({reducer:{
    auth:authSlice,
    career:careerSlice, 
    users: usersReducer
}});

export default store;
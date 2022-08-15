import { configureStore} from '@reduxjs/toolkit'
import authSlice from "../reducer/authReducer.js";
import careerSlice from "../reducer/careerReducer.js";
import usersReducer from '../reducer/usersReducer.js';
import examsReducer from '../reducer/examsReducer.js';

const store =configureStore({reducer:{
    auth:authSlice,
    career:careerSlice, 
    users: usersReducer,
    exams: examsReducer
}});

export default store;
import { configureStore} from '@reduxjs/toolkit'
import authSlice from "../reducer/authReducer.js";
import careerSlice from "../reducer/careerReducer.js";

const store =configureStore({reducer:{
    auth:authSlice,
    career:careerSlice
}});

export default store;
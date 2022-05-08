import { configureStore} from '@reduxjs/toolkit'
import authSlice from "../reducer/authReducer.js";


const store =configureStore({reducer:{
    auth:authSlice
}});

export default store;
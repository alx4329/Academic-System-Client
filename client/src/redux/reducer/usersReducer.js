import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {API_BASE} from '../../config/index'

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : "";
let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";



const initialState = {
    user: user || null,
    token: token || null,
    loading: false,
    studentsList:null,
    teachersList:null,
    error: null
}
const headers = {
    'Authorization': `Bearer ${token}`,
}

export const getStudents = createAsyncThunk(
    'getStudents',
    async( _, {rejectWithValue})=>{
        try{
            console.log("fetching studentssssssss")
            const users = await axios.get(`${API_BASE}/students`,headers)
            return users.data
        }
        catch(e){
            rejectWithValue({message:e.message})
        }
        
    }
    )
    export const getTeachers = createAsyncThunk(
        'getTeachers',
        async( _, {rejectWithValue})=>{
        console.log("fetching TEACHERSssssssss")
        try{
            const users = await axios.get(`${API_BASE}/teachers`,headers)
            return users.data
        }
        catch(e){
            rejectWithValue({message:e.message})
    }
        
    }
    )
    
const usersSlice = createSlice({
    name:'users', 
    initialState, 
    reducers:{
        cleanError: (state)=>{
            state.error = null
        },
        clearList:(state)=>{
            state.studentsList=null
            state.teachersList=null
        }
    }, 
    extraReducers:{
        [getStudents.pending]: (state, action) => {
            state.loading = true
        },
        [getStudents.fulfilled]: (state, action) => {
            state.loading = false
            state.studentsList = action.payload
        },
        [getStudents.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getTeachers.pending]: (state, action) => {
            state.loading = true
        },
        [getTeachers.fulfilled]: (state, action) => {
            state.loading = false
            state.teachersList = action.payload
        },
        [getTeachers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
})

export const { cleanError, clearList} = usersSlice.actions
export default usersSlice.reducer
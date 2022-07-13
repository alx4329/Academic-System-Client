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
    error: null, 
    deleted: false
}
const headers = {
    'Authorization': `Bearer ${token}`,
}

export const getStudents = createAsyncThunk(
    'getStudents',
    async( _, {rejectWithValue})=>{
        try{
            const users = await axios.get(`/students`,headers)
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
    try{
        const users = await axios.get(`/teachers`,headers)
        return users.data
    }
    catch(e){
        rejectWithValue({message:e.message})
    }
    
}
)

export const deleteUser = createAsyncThunk(
    'deleteUser', 
    async({dni, type}, {rejectWithValue})=>{
        console.log(dni, type)
        try{
            const deleted = await axios.delete(`/${type}?dni=${dni}`,headers)
            return true
        }catch(e){
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
        }, 
        cleanDeleted:(state)=>{
            state.deleted=false
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
        [deleteUser.pending]: (state, action) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.deleted = action.payload
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
})

export const { cleanError, clearList, cleanDeleted} = usersSlice.actions
export default usersSlice.reducer
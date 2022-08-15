import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {API_BASE} from '../../config/index'

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : "";
let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";

const initialState={
    newExam:null,
    error:null,
    loading:false
}

const headers = {
    'Authorization': `Bearer${token}`
}

export const newExam = createAsyncThunk(
    'newExam',
    async({state},{rejectWithValue})=>{
        try{
            const postExam = await axios.post(`/exams`,state,headers)
            return (postExam.data)
        }catch(e){
            rejectWithValue({message:e.message})
        }
    }
)

const examsSlice = createSlice({
    name:'exams',
    initialState,
    reducers:{
        cleanError: (state) =>{
            state.error= null
        },
        cleanNewExam:(state)=>{
            state.newExam=null
        }
    },
    extraReducers:{
        [newExam.pending]: (state, action) => {
            state.loading = true
        },
        [newExam.fulfilled]: (state, action) => {
            state.loading = false
            state.newExam = action.payload
        },
        [newExam.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {cleanError,cleanNewExam} = examsSlice.actions
export default examsSlice.reducer
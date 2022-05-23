import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_BASE } from '../../config';


let newCareer = localStorage.getItem("career")
  ? JSON.parse(localStorage.getItem("career"))
  : "";
let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";



const initialState = {
    newCareer: newCareer || null,
    career: null,
    subjects: [],
    createdSubject: null,
    token: token || null,
    loading: false,
    error: null
}
const headers = {
    'Authorization': `Bearer ${token}`,
}


export const addCareer = createAsyncThunk(
    'addCareer',
    async ({name,code}, {rejectWithValue})=>{
       
        try{
            const data = {
                name,
                code
            }
            const career = await axios.post(`${API_BASE}/careers`,data,headers)
            localStorage.setItem("newCareer", JSON.stringify(career.data))
            return career.data
        }catch(e){
            return rejectWithValue({message:e.message})
        }
    }
    )
export const getCareer = createAsyncThunk(
    'getCareer',
    async ({careerId}, {rejectWithValue})=>{
        console.log(careerId)
        try{
            const careerInfo = await axios.get(`${API_BASE}/careers/${careerId}`,headers)
            console.log(careerInfo.data)
            localStorage.setItem("career", JSON.stringify(careerInfo.data))
            return careerInfo.data
        }catch(e){
            return rejectWithValue({message:e.message})
        }
    }
    )
export const newSubject = createAsyncThunk(
    'newSubject',
    async ({info},{rejectWithValue})=>{
        console.log(info)
        try{
            const subject = await axios.post(`${API_BASE}/subjects`,info,headers)
            return subject.data
        }catch(e){
            return rejectWithValue({message:e.message})
        }
    }
)

const careerSlice = createSlice({
    name: 'career', 
    initialState: initialState,
    reducers:{
        cleanError: (state)=>{
            state.error = null
        },
        cleanNewCareer: (state)=>{
            state.newCareer = null
        }
    },
    extraReducers: {
        [addCareer.pending]: (state, action) => {
            state.loading = true
        },
        [addCareer.fulfilled]: (state, action) => {
            state.loading = false
            state.newCareer = action.payload
        },
        [addCareer.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getCareer.pending]: (state, action) => {
            state.loading = true
        },
        [getCareer.fulfilled]: (state, action) => {
            state.loading = false
            state.career = action.payload
        },
        [getCareer.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [newSubject.pending]: (state, action) => {
            state.loading = true
        },
        [newSubject.fulfilled]: (state, action) => {
            state.loading = false
            state.createdSubject = action.payload
        },
        [newSubject.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        }


        
        
        

    }
})
export const { cleanError,cleanNewCareer } = careerSlice.actions
export default careerSlice.reducer
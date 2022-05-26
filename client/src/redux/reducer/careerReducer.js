import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_BASE } from '../../config';



let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";



const initialState = {
    newCareer: null,
    career: null,
    careers: [],
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
    async ({name,code,years}, {rejectWithValue})=>{
       
        try{
            const data = {
                name,
                code,
                years
            }
            const career = await axios.post(`${API_BASE}/careers`,data,headers)
            return career.data
        }catch(e){
            return rejectWithValue({message:e.message})
        }
    }
    )
export const getCareer = createAsyncThunk(
    'getCareer',
    async ({careerId}, {rejectWithValue})=>{
        
        try{
            const careerInfo = await axios.get(`${API_BASE}/careers?careerId=${careerId}`,headers)
            
            
            return careerInfo.data
        }catch(e){
            return rejectWithValue({message:e.message})
        }
    }
    )
export const getCareers = createAsyncThunk(
    'getCareers',
    async ( _, {rejectWithValue})=>{
        console.log("dispatchinnnnnnnn")
        try{
            const careerInfo = await axios.get(`${API_BASE}/careers`,headers)
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
            console.log(e)
            return rejectWithValue({message:e.response.data.message || e.message|| e})
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
        },
        [getCareers.pending]: (state, action) => {
            state.loading = true
        },
        [getCareers.fulfilled]: (state, action) => {
            state.loading = false
            state.careers = action.payload
        },
        [getCareers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }


        
        
        

    }
})
export const { cleanError,cleanNewCareer } = careerSlice.actions
export default careerSlice.reducer
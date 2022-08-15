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
    createdSubject: null,
    token: token || null,
    loading: false,
    error: null, 
    success:false
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
            const career = await axios.post(`/careers`,data,headers)
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
            const careerInfo = await axios.get(`/careers?careerId=${careerId}`,headers)
            
            
            return careerInfo.data
        }catch(e){
            return rejectWithValue({message:e.message||e})
        }
    }
    )
export const getCareers = createAsyncThunk(
    'getCareers',
    async ( _, {rejectWithValue})=>{
        try{
            const careerInfo = await axios.get(`/careers`,headers)
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
            const subject = await axios.post(`/subjects`,info,headers)
            return subject.data
        }catch(e){
            console.log(e)
            return rejectWithValue({message:e.response.data.message || e.message|| e})
        }
    }
    )
export const updateSubject = createAsyncThunk(
    'updateSubject',
    async ({info,id},{rejectWithValue})=>{
        console.log(info)
        try{
            const subject = await axios.put(`/subjects?subjectId=${id}`,info,headers)
            return subject.data
        }catch(e){
            console.log(e)
            return rejectWithValue({message:e.response.data.message || e.message|| e})
        }
    }
    )
    export const deletePlan = createAsyncThunk(
    'deletePlan', 
    async({id},{rejectWithValue})=>{
        console.log(id)
        const info= {careerId:id}
        try{
            const deleted = await axios.post(`/subjects/allInCareer`,info,headers)
            if(deleted.status==="ok") return 
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
        },
        [deletePlan.pending]: (state, action) => {
            state.loading = true
        },
        [deletePlan.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true
            
        },
        [deletePlan.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [updateSubject.pending]: (state, action) => {
            state.loading = true
        },
        [updateSubject.fulfilled]: (state, action) => {
            state.loading = false
            state.createdSubject = action.payload
        },
        [updateSubject.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },


        
        
        

    }
})
export const { cleanError,cleanNewCareer } = careerSlice.actions
export default careerSlice.reducer
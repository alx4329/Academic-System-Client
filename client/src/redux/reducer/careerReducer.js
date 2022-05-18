import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_BASE } from '../../config';

let career = localStorage.getItem("career")
  ? JSON.parse(localStorage.getItem("career"))
  : "";
let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";



const initialState = {
    career: career || null,
    newCareer: null,
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
            return career.data
        }catch(e){
            return rejectWithValue({message:e.message})
        }
    }
    )


const authSlice = createSlice({
    name: 'auth', 
    initialState: initialState,
    reducers:{
        cleanError: (state)=>{
            state.error = null
        },
        cleanNewCareer: (state)=>{
            state.newCareer = null
        },
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
        }
        
        
        

    }
})
export const { cleanNewCareer, cleanError } = authSlice.actions
export default authSlice.reducer
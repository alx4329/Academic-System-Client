import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_BASE } from '../../config';

const initialState = {
    user: null
}
export const login = createAsyncThunk(
    'login',
    async ({email,password}, {rejectWithValue})=>{
        try{
            const data = {
                email,
                password
            }
            const user = await axios.post(`${API_BASE}/login`,data)
            return user.data
             
        }catch(e){
            console.log(e.error)
            return {error:"Error al obtener el usuario"}
        }
    }
    )
const reducerSlice = createSlice({
    name: 'reducer', 
    initialState: initialState,
    reducers:{

    },
    extraReducers: {
        [login.fulfilled]: (state, {payload}) => {
            state.user = payload
        },
        [login.rejected]: (state, {payload}) => {
            console.log(payload)
        },
        [login.pending]: (state, {payload}) => {
            state.user = null

        }
    }
})

export default reducerSlice.reducer
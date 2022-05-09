import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_BASE } from '../../config';

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
}
const headers = {
    'Authorization': `Bearer ${token}`,
}
export const login = createAsyncThunk(
    'login',
    async ({email,password}, {rejectWithValue})=>{
        console.log("en la action")
        try{
            const data = {
                email,
                password
            }
            const user = await axios.post(`${API_BASE}/users/signin`,data,headers)
            localStorage.setItem("currentUser", JSON.stringify(user.data.user))
            localStorage.setItem("token", JSON.stringify(user.data.token))
            return user.data
             
        }catch(e){
            console.log(e.error)
            return {error:"Error al obtener el usuario"}
        }
    }
    )
const authSlice = createSlice({
    name: 'auth', 
    initialState: initialState,
    reducers:{

    },
    extraReducers: {
        [login.fulfilled]: (state, {payload}) => {
            state.user = payload.user;
            state.token = payload.token;
            state.loading = false;
        },
        [login.rejected]: (state, {payload}) => {
            console.log(payload)
            state.loading = false;
        },
        [login.pending]: (state, {payload}) => {
            state.user = null
            state.loading = true;

        }
    }
})

export default authSlice.reducer
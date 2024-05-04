import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userDetails) =>{
        try {
            const login = await axios.post('/users/login',userDetails,{withCredentials:true})
            console.log(login)
            return login.data.data.user;
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              throw Error(errorMessage)
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(userDetails) => {
        try {
            const register = await axios.post('/users/register',userDetails,{withCredentials:true});
            console.log(register)
            return register.data.data
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              throw Error(errorMessage)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async() => {
        try {
            const logout = await axios.post('/users/logout',{},{withCredentials:true});
            return logout
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              throw Error(errorMessage)
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async() => {
        try {
            const user = await axios.get('/users/current-user',{withCredentials:true});
            console.log(user.data.data.fullname)
            return user.data.data
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              
              throw Error(errorMessage)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.user = null;
            console.log(action.error.message)
            if(action.error.message == 'Request failed with status code 401') state.error = 'Invalid User credentials'
            else state.error = action.error.message;
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            console.log(state.user)
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.error.message;
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.error = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to logout';
        })
        .addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch current user';
        });
    }
})

export default userSlice.reducer
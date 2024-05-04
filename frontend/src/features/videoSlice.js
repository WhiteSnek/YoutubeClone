import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getVideos = createAsyncThunk(
    'video/getVideo',
    async() => {
        try {
            const video = await axios.get('/videos/', {withCredentials:true})
            
            return video.data.data
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              
              throw Error(errorMessage)
        }
    }
)

export const getVideoById = createAsyncThunk(
    'video/getVideoById',
    async(id) => {
        try {
            const video = await axios.get(`/videos/${id}`,{withCredentials:true})
            console.log(video)
            return video.data.data
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              
              throw Error(errorMessage)
        }
    }
)

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        loading: false,
        video: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getVideos.pending, (state) => {
            state.loading = true,
            state.video = [],
            state.error = null
        })
        .addCase(getVideos.fulfilled, (state, action) => {
            state.loading = false,
            state.video = action.payload,
            state.error = null
        })
        .addCase(getVideos.rejected, (state, action) => {
            state.loading = false,
            state.video = [],
            state.error = action.error?.message
        })
        .addCase(getVideoById.pending, (state) => {
            state.loading = true,
            state.video = [],
            state.error = null
        })
        .addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false,
            state.video = action.payload,
            state.error = null
        })
        .addCase(getVideoById.rejected, (state, action) => {
            state.loading = false,
            state.video = [],
            state.error = action.error?.message
        })
    }
})

export default videoSlice.reducer
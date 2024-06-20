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
            return video.data.data
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              
              throw Error(errorMessage)
        }
    }
)

export const getUserVideo = createAsyncThunk(
    'video/getUserVideo',
    async(userId) => {
        try {
            console.log(userId)
            const videos = await axios.get(`/videos?userId=${userId}`,{withCredentials: true});
            return videos.data.data;
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
              
              throw Error(errorMessage)
        }
    }
)

export const uploadVideo = createAsyncThunk(
    'video/uploadVideo',
    async(videoData)  => {
        try {
            console.log(videoData)
            const video = await axios.post('/videos/',{videoData},{
                
                withCredentials: true
                
            })
            console.log(video);
            return video;
        } catch (error) {
            // const errorMessage = error.response.data.match(
            //     /<pre>Error: (.*?)<br>/
            //   )[1];
              
              throw Error(error)
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
        .addCase(getUserVideo.pending, (state) => {
            state.loading = true,
            state.video = [],
            state.error = null
        })
        .addCase(getUserVideo.fulfilled, (state, action) => {
            state.loading = false,
            state.video = action.payload,
            state.error = null
        })
        .addCase(getUserVideo.rejected, (state, action) => {
            state.loading = false,
            state.video = [],
            console.log(action.error.message)
            state.error = action.error?.message
        })
        .addCase(uploadVideo.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(uploadVideo.fulfilled, (state, action) => {
            state.loading = false,
            state.video.push(action.payload),
            state.error = null
        })
        .addCase(uploadVideo.rejected, (state, action) => {
            state.loading = false,
            console.log(action.error.message)
            state.error = action.error?.message
        })
    }
})

export default videoSlice.reducer
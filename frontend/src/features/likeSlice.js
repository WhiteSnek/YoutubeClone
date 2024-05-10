import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleCommentLike = createAsyncThunk(
    'like/toggleCommentLike',
    async(commentId) => {
        try {
            const like = await axios.post(`/likes/toggle/c/${commentId}`,{},{withCredentials:true});
            return like;
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
        
              throw Error(errorMessage);
        }
    }
)


export const toggleVideoLike = createAsyncThunk(
    'like/toggleVideoLike',
    async(videoId) => {
        try {
            const like = await axios.post(`/likes/toggle/v/${videoId}`,{},{withCredentials:true});
            return like;
        } catch (error) {
            const errorMessage = error.response.data.match(
                /<pre>Error: (.*?)<br>/
              )[1];
        
              throw Error(errorMessage);
        }
    }
)

const likeSlice = createSlice({
    name: "comment",
    initialState: {
      loading: false,
      like: null,
      error: null
    },
    extraReducers: (builder) => {
        builder.addCase(toggleCommentLike.pending, (state)=>{
            state.loading = true;
            state.like = null;
            state.error = null;
        })
        .addCase(toggleCommentLike.fulfilled, (state,action)=>{
            state.loading = false;
            state.like = action.payload;
            state.error = null;
        })
        .addCase(toggleCommentLike.rejected, (state,action)=>{
            state.loading = false;
            state.like = null;
            state.error = action.error?.message;
        })
        .addCase(toggleVideoLike.pending, (state)=>{
            state.loading = true;
            state.like = null;
            state.error = null;
        })
        .addCase(toggleVideoLike.fulfilled, (state,action)=>{
            state.loading = false;
            state.like = action.payload;
            state.error = null;
        })
        .addCase(toggleVideoLike.rejected, (state,action)=>{
            state.loading = false;
            state.like = null;
            state.error = action.error?.message;
        })
    }

});

export default likeSlice.reducer


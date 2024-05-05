import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (videoId) => {
    try {
      const comments = await axios.get(`/comments/${videoId}`, {
        withCredentials: true,
      });
      return comments.data.data;
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];

      throw Error(errorMessage);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    comment: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state)=>{
        state.loading = true;
        state.comment = [];
        state.error = null
    })
    .addCase(getComments.fulfilled, (state,action)=>{
        state.loading = false;
        state.comment = action.payload;
        state.error = null
    })
    .addCase(getComments.rejected, (state,action) =>{
        state.loading = false;
        state.comment = [];
        state.error = action.error?.message
    })
  },
});

export default commentSlice.reducer

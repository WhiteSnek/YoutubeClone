import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserPlaylists = createAsyncThunk(
  "playlist/getUserPlaylist",
  async (userId) => {
    try {
      const playlist = await axios.get(`/playlist/user/${userId}`, {
        withCredentials: true,
      });
      return playlist.data.data;
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];

      throw Error(errorMessage);
    }
  }
);

export const getPlayListById = createAsyncThunk(
  "playlist/getPlayListById",
  async (playlistId) => {
    try {
      const playlist = await axios.get(`/playlist/${playlistId}`, {
        withCredentials: true,
      });
      // console.log(playlist.data.data)
      return playlist.data.data;
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];

      throw Error(errorMessage);
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideoToPlaylist",
  async ({videoId, playlistId}) => {
    try {
      const add = await axios.patch(
        `/playlist/add/${videoId}/${playlistId}`,
        {},
        { withCredentials: true }
      );
      return add.data.data;
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];

      throw Error(errorMessage);
    }
  }
);
export const removeVideoFromPlaylist = createAsyncThunk(
  "playlist/removeVideoFromPlaylist",
  async ({videoId, playlistId}) => {
    try {
      console.log("video id: ",videoId,"playlist id: ",playlistId)
      const remove = await axios.patch(
        `/playlist/remove/${videoId}/${playlistId}`,
        {},
        { withCredentials: true }
      );
      return remove.data.data;
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];

      throw Error(errorMessage);
    }
  }
);

export const editPlaylist = createAsyncThunk(
  'playlist/updatePlaylist',
  async ({ name, description, playlistId }) => {
    try {
      
      console.log(description);
      const response = await axios.patch(
        `/playlist/${playlistId}`,
        { name, description },
        { withCredentials: true }
      );
      console.log(response.data.data)
      return response.data; // Ensure only serializable data is returned
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];
      throw new Error(errorMessage);
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    loading: false,
    playlist: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylists.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        (state.loading = false), (state.playlist = action.payload);
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error?.message);
      })
      .addCase(getPlayListById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayListById.fulfilled, (state, action) => {
        (state.loading = false), (state.playlist = action.payload);
      })
      .addCase(getPlayListById.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error?.message);
      })
      .addCase(addVideoToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideoToPlaylist.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(addVideoToPlaylist.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error?.message);
      })
      .addCase(removeVideoFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeVideoFromPlaylist.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
        (state.loading = false),(console.log(action.error.message)), (state.error = action.error?.message);
      })
      .addCase(editPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPlaylist.fulfilled, (state,action) => {
        (state.loading = false),(state.playlist = action.payload), (state.error = null);
      })
      .addCase(editPlaylist.rejected, (state, action) => {
        (state.loading = false),(console.log(action.error.message)), (state.error = action.error?.message);
      })
  },
});

export default playlistSlice.reducer;

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
  async ({ videoId, playlistId }) => {
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
  async ({ videoId, playlistId }) => {
    try {
      console.log("video id: ", videoId, "playlist id: ", playlistId);
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
  "playlist/updatePlaylist",
  async ({ name, description, playlistId }) => {
    try {
      console.log(
        "name: ",
        name,
        " description: ",
        description,
        " Id: ",
        playlistId
      );
      const response = await axios.patch(
        `/playlist/${playlistId}`,
        { name, description },
        { withCredentials: true }
      );
      return response.data.data; // Ensure only serializable data is returned
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];
      throw new Error(errorMessage);
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "playlist/deletePlaylist",
  async (playlistId) => {
    try {
      const response = await axios.delete(`/playlist/${playlistId}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];
      throw new Error(errorMessage);
    }
  }
);

export const createPlaylist = createAsyncThunk(
  "playlist/createPlaylist",
  async (details) => {
    try {
      const response = await axios.patch('/playlist/',details,{withCredentials:true});
      return response.data.data
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];
      throw new Error(errorMessage);
    }
  }
)

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    loading: false,
    playlist: null,
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
        (state.loading = false),
          (state.playlist = action.payload),
          console.log(state.playlist);
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
        (state.loading = false),
          console.log(action.error.message),
          (state.error = action.error?.message);
      })
      .addCase(editPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPlaylist.fulfilled, (state, action) => {
        (state.loading = false),
          (state.playlist = action.payload),
          console.log(state.playlist),
          (state.error = null);
      })
      .addCase(editPlaylist.rejected, (state, action) => {
        (state.loading = false),
          console.log(action.error.message),
          (state.error = action.error?.message);
      })
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        (state.loading = false), (state.playlist = null), (state.error = null);
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(createPlaylist.fulfilled, (state,action) => {
        state.loading = false;
        state.playlist = action.payload;
        state.error = null;
      })
      .addCase(createPlaylist.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error?.message;
      })
  },
});

export default playlistSlice.reducer;

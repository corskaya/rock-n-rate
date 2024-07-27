import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../utils/network";
import Artist from "../../types/artist";
import Album from "../../types/album";
import Song from "../../types/song";
import ToastStatus from "../../types/toast";
import { isAxiosError } from "axios";
import { PopularAlbumsResponse, PopularArtistsResponse, PopularSongsResponse } from "./types";

export type HomeState = {
  popularArtistsPending: boolean;
  popularArtistsFulfilled: boolean;
  popularArtistsRejected: boolean;
  popularArtistsErrorMessage?: string;
  popularArtists: Artist[];
  popularAlbumsPending: boolean;
  popularAlbumsFulfilled: boolean;
  popularAlbumsRejected: boolean;
  popularAlbumsErrorMessage?: string;
  popularAlbums: Album[];
  popularSongsPending: boolean;
  popularSongsFulfilled: boolean;
  popularSongsRejected: boolean;
  popularSongsErrorMessage?: string;
  popularSongs: Song[];
  toastStatus: ToastStatus;
};

const initialState: HomeState = {
  popularArtistsPending: false,
  popularArtistsFulfilled: false,
  popularArtistsRejected: false,
  popularArtists: [],
  popularAlbumsPending: false,
  popularAlbumsFulfilled: false,
  popularAlbumsRejected: false,
  popularAlbums: [],
  popularSongsPending: false,
  popularSongsFulfilled: false,
  popularSongsRejected: false,
  popularSongs: [],
  toastStatus: { show: false },
};

export const getPopularArtists = createAsyncThunk(
  "home/getPopularArtists",
  async (_, thunkAPI) => {
    try {
      const { data, status } = await get(`/artist/mostRatedArtists`);

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        return e.response
          ? thunkAPI.rejectWithValue(e.response.data)
          : thunkAPI.rejectWithValue(e);
      }
    }
  }
);

export const getPopularAlbums = createAsyncThunk(
  "home/getPopularAlbums",
  async (_, thunkAPI) => {
    try {
      const { data, status } = await get(`/album/mostRatedAlbums`);

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        return e.response
          ? thunkAPI.rejectWithValue(e.response.data)
          : thunkAPI.rejectWithValue(e);
      }
    }
  }
);

export const getPopularSongs = createAsyncThunk(
  "home/getPopularSongs",
  async (_, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/mostRatedSongs`);

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        return e.response
          ? thunkAPI.rejectWithValue(e.response.data)
          : thunkAPI.rejectWithValue(e);
      }
    }
  }
);

const homeReducer = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularArtists.pending, (state) => {
        state.popularArtistsPending = true;
        state.popularArtistsFulfilled = false;
        state.popularArtistsRejected = false;
        state.popularArtists = [];
      })
      .addCase(getPopularArtists.fulfilled, (state, { payload }: { payload: PopularArtistsResponse }) => {
        state.popularArtistsPending = false;
        state.popularArtistsRejected = false;
        state.popularArtistsFulfilled = true;
        state.popularArtists = payload.mostRatedArtists;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getPopularArtists.rejected, (state, { payload }: { payload: any }) => {
        state.popularArtistsPending = false;
        state.popularArtistsRejected = true;
        state.popularArtistsErrorMessage = payload.message;
      })
      .addCase(getPopularAlbums.pending, (state) => {
        state.popularAlbumsPending = true;
        state.popularAlbumsFulfilled = false;
        state.popularAlbumsRejected = false;
        state.popularAlbums = [];
      })
      .addCase(getPopularAlbums.fulfilled, (state, { payload }: { payload: PopularAlbumsResponse }) => {
        state.popularAlbumsPending = false;
        state.popularAlbumsRejected = false;
        state.popularAlbumsFulfilled = true;
        state.popularAlbums = payload.mostRatedAlbums;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getPopularAlbums.rejected, (state, { payload }: { payload: any }) => {
        state.popularAlbumsPending = false;
        state.popularAlbumsRejected = true;
        state.popularAlbumsErrorMessage = payload.message;
      })
      .addCase(getPopularSongs.pending, (state) => {
        state.popularSongsPending = true;
        state.popularSongsFulfilled = false;
        state.popularSongsRejected = false;
        state.popularSongs = [];
      })
      .addCase(getPopularSongs.fulfilled, (state, { payload }: { payload: PopularSongsResponse }) => {
        state.popularSongsPending = false;
        state.popularSongsRejected = false;
        state.popularSongsFulfilled = true;
        state.popularSongs = payload.mostRatedSongs;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getPopularSongs.rejected, (state, { payload }: { payload: any }) => {
        state.popularSongsPending = false;
        state.popularSongsRejected = true;
        state.popularSongsErrorMessage = payload.message;
      });
  },
});

export default homeReducer.reducer;

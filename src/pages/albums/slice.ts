import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { get } from "../../utils/network";
import { AlbumFilter, AlbumsResponse } from "./types";
import Album from "../../types/album";
import Genre from "../../types/genre";
import ToastStatus from "../../types/toast";
import { isAxiosError } from "axios";

export type AlbumsState = {
  albumsPending: boolean;
  albumsFulfilled: boolean;
  albumsRejected: boolean;
  errorMessage?: string;
  albums: Album[];
  albumsCount: number;
  pageCount: number;
  page: number;
  filters: AlbumFilter;
  toastStatus: ToastStatus;
};

const initialState: AlbumsState = {
  albumsPending: false,
  albumsFulfilled: false,
  albumsRejected: false,
  albums: [],
  albumsCount: 0,
  pageCount: 0,
  page: 1,
  filters: {
    searchTerm: "",
    genre: Genre.All,
    rating: 0,
    year: "All",
    orderBy: "Latest",
  },
  toastStatus: { show: false },
};

export const getAlbums = createAsyncThunk(
  "albums/getAlbums",
  async (filters: AlbumFilter, thunkAPI) => {
    try {
      const { data, status } = await get("/album", filters);

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

const albumsReducer = createSlice({
  name: "albumsReducer",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<AlbumFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    goToPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbums.pending, (state) => {
        state.albumsPending = true;
        state.albumsRejected = false;
        state.albums = [];
        state.albumsCount = 0;
        state.pageCount = 0;
      })
      .addCase(getAlbums.fulfilled, (state, { payload }: { payload: AlbumsResponse }) => {
        state.albumsPending = false;
        state.albumsRejected = false;
        state.albumsFulfilled = true;
        state.albums = payload.albums;
        state.albumsCount = payload.count;
        state.pageCount = payload.pageCount;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getAlbums.rejected, (state, { payload }: { payload: any }) => {
        state.albumsPending = false;
        state.albumsRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export const { setFilters, goToPage } = albumsReducer.actions;

export default albumsReducer.reducer;

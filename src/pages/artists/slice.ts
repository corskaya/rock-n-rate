import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { get } from "../../utils/network";
import Artist from "../../types/artist";
import { ArtistFilter, ArtistsResponse } from "./types";
import ToastStatus from "../../types/toast";
import Genre from "../../types/genre";
import { isAxiosError } from "axios";

export type ArtistsState = {
  artistsPending: boolean;
  artistsFulfilled: boolean;
  artistsRejected: boolean;
  errorMessage?: string;
  artists: Artist[];
  artistsCount: number;
  pageCount: number;
  page: number;
  filters: ArtistFilter;
  toastStatus: ToastStatus;
};

const initialState: ArtistsState = {
  artistsPending: false,
  artistsFulfilled: false,
  artistsRejected: false,
  artists: [],
  artistsCount: 0,
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

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async (filters: ArtistFilter, thunkAPI) => {
    try {
      const { data, status } = await get("/artist", filters);

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

const artistsReducer = createSlice({
  name: "artistsReducer",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ArtistFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    goToPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.artistsPending = true;
        state.artistsRejected = false;
        state.artists = [];
        state.artistsCount = 0;
        state.pageCount = 0;
      })
      .addCase(getArtists.fulfilled, (state, { payload }: { payload: ArtistsResponse }) => {
        state.artistsPending = false;
        state.artistsRejected = false;
        state.artistsFulfilled = true;
        state.artists = payload.artists;
        state.artistsCount = payload.count;
        state.pageCount = payload.pageCount;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getArtists.rejected, (state, { payload }: { payload: any }) => {
        state.artistsPending = false;
        state.artistsRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export const { setFilters, goToPage } = artistsReducer.actions;

export default artistsReducer.reducer;

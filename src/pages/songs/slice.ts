import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { get } from "../../utils/network";
import Song from "../../types/song";
import { SongFilter, SongsResponse } from "./types";
import ToastStatus from "../../types/toast";
import Genre from "../../types/genre";
import { isAxiosError } from "axios";

export type SongsState = {
  songsPending: boolean;
  songsFulfilled: boolean;
  songsRejected: boolean;
  errorMessage?: string;
  songs: Song[];
  songsCount: number;
  pageCount: number;
  page: number;
  filters: SongFilter;
  isFiltered: boolean;
  showFilterModal: boolean;
  toastStatus: ToastStatus;
};

const initialState: SongsState = {
  songsPending: false,
  songsFulfilled: false,
  songsRejected: false,
  songs: [],
  songsCount: 0,
  pageCount: 0,
  page: 1,
  filters: {
    searchTerm: "",
    genre: Genre.All,
    rating: 0,
    year: "All",
    orderBy: "Latest",
  },
  isFiltered: false,
  showFilterModal: false,
  toastStatus: { show: false },
};

export const getSongs = createAsyncThunk(
  "songs/getSongs",
  async (filters: SongFilter, thunkAPI) => {
    try {
      const { data, status } = await get("/song", filters);

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

const songsReducer = createSlice({
  name: "songsReducer",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<SongFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    goToPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setShowFilterModal: (state, action: PayloadAction<boolean>) => {
      state.showFilterModal = action.payload;
    },
    setIsFiltered: (state, action: PayloadAction<boolean>) => {
      state.isFiltered = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongs.pending, (state) => {
        state.songsPending = true;
        state.songsRejected = false;
        state.songs = [];
        state.songsCount = 0;
        state.pageCount = 0;
      })
      .addCase(getSongs.fulfilled, (state, { payload }: { payload: SongsResponse }) => {
        state.songsPending = false;
        state.songsRejected = false;
        state.songsFulfilled = true;
        state.songs = payload.songs;
        state.songsCount = payload.count;
        state.pageCount = payload.pageCount;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getSongs.rejected, (state, { payload }: { payload: any }) => {
        state.songsPending = false;
        state.songsRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export const { setFilters, goToPage, setShowFilterModal, setIsFiltered } = songsReducer.actions;

export default songsReducer.reducer;

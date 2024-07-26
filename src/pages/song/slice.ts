import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { get, post, del } from "../../utils/network";
import Song from "../../types/song";
import Rating from "../../types/rating";
import ToastStatus from "../../types/toast";
import { isAxiosError } from "axios";

export type SongState = {
  songPending: boolean;
  songFulfilled: boolean;
  songRejected: boolean;
  song?: Song;
  songErrorMessage?: string;
  similarSongsPending: boolean;
  similarSongsFulfilled: boolean;
  similarSongsRejected: boolean;
  similarSongs?: Song[];
  similarSongsErrorMessage?: string;
  ratingsPending: boolean;
  ratingsFulfilled: boolean;
  ratingsRejected: boolean;
  ratings?: Rating[];
  ratingsErrorMessage?: string;
  rateSongPending: boolean;
  rateSongFulfilled: boolean;
  rateSongRejected: boolean;
  rateSongErrorMessage?: string;
  removeRatingPending: boolean;
  removeRatingFulfilled: boolean;
  removeRatingRejected: boolean;
  removeRatingErrorMessage?: string;
  showRateModal: boolean;
  showRatingsModal: boolean;
  toastStatus: ToastStatus;
};

const initialState: SongState = {
  songPending: false,
  songFulfilled: false,
  songRejected: false,
  similarSongsPending: false,
  similarSongsFulfilled: false,
  similarSongsRejected: false,
  similarSongs: [],
  ratingsPending: false,
  ratingsFulfilled: false,
  ratingsRejected: false,
  ratings: [],
  rateSongPending: false,
  rateSongFulfilled: false,
  rateSongRejected: false,
  removeRatingPending: false,
  removeRatingFulfilled: false,
  removeRatingRejected: false,
  showRateModal: false,
  showRatingsModal: false,
  toastStatus: { show: false },
};

export const getSong = createAsyncThunk(
  "songs/getSong",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/${id}`);

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

export const getSimilarSongs = createAsyncThunk(
  "songs/getSimilarSongs",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/similarSongs/${id}`);

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

export const getRatings = createAsyncThunk(
  "songs/getRatings",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/ratings/${id}`);

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

export const rateSong = createAsyncThunk(
  "songs/rateSong",
  async ({ id, rating }: { id: string, rating: number }, thunkAPI) => {
    try {
      const { data, status } = await post(`/song/rate/${id}`, { rating });

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

export const removeRating = createAsyncThunk(
  "songs/removeRating",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await del(`/song/removeRating/${id}`);

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

const songReducer = createSlice({
  name: "songReducer",
  initialState,
  reducers: {
    setShowRateModal: (state, action: PayloadAction<boolean>) => {
      state.showRateModal = action.payload;
    },
    setShowRatingsModal: (state, action: PayloadAction<boolean>) => {
      state.showRatingsModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSong.pending, (state) => {
        state.songPending = true;
        state.songRejected = false;
        state.songFulfilled = false;
      })
      .addCase(getSong.fulfilled, (state, { payload }) => {
        state.songPending = false;
        state.songRejected = false;
        state.songFulfilled = true;
        state.song = payload.song;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getSong.rejected, (state, { payload }: { payload: any }) => {
        state.songPending = false;
        state.songRejected = true;
        state.songErrorMessage = payload.message;
      })
      .addCase(getSimilarSongs.pending, (state) => {
        state.similarSongsPending = true;
        state.similarSongsRejected = false;
        state.similarSongs = [];
      })
      .addCase(getSimilarSongs.fulfilled, (state, { payload }) => {
        state.similarSongsPending = false;
        state.similarSongsRejected = false;
        state.similarSongsFulfilled = true;
        state.similarSongs = payload.similarSongs;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getSimilarSongs.rejected, (state, { payload }: { payload: any }) => {
        state.similarSongsPending = false;
        state.similarSongsRejected = true;
        state.similarSongsErrorMessage = payload.message;
      })
      .addCase(getRatings.pending, (state) => {
        state.ratingsPending = true;
        state.ratingsRejected = false;
        state.ratings = [];
      })
      .addCase(getRatings.fulfilled, (state, { payload }) => {
        state.ratingsPending = false;
        state.ratingsRejected = false;
        state.ratingsFulfilled = true;
        state.ratings = payload.ratings;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getRatings.rejected, (state, { payload }: { payload: any }) => {
        state.ratingsPending = false;
        state.ratingsRejected = true;
        state.ratingsErrorMessage = payload.message;
      })
      .addCase(rateSong.pending, (state) => {
        state.rateSongPending = true;
        state.rateSongRejected = false;
        state.rateSongFulfilled = false;
      })
      .addCase(rateSong.fulfilled, (state, { payload }) => {
        state.rateSongPending = false;
        state.rateSongRejected = false;
        state.rateSongFulfilled = true;
        state.song = payload.song;
        state.showRateModal = false;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(rateSong.rejected, (state, { payload }: { payload: any }) => {
        state.rateSongPending = false;
        state.rateSongRejected = true;
        state.rateSongErrorMessage = payload.message;
      })
      .addCase(removeRating.pending, (state) => {
        state.removeRatingPending = true;
        state.removeRatingRejected = false;
        state.removeRatingFulfilled = false;
      })
      .addCase(removeRating.fulfilled, (state, { payload }) => {
        state.removeRatingPending = false;
        state.removeRatingRejected = false;
        state.removeRatingFulfilled = true;
        state.song = payload.song;
        state.showRateModal = false;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(removeRating.rejected, (state, { payload }: { payload: any }) => {
        state.removeRatingPending = false;
        state.removeRatingRejected = true;
        state.removeRatingErrorMessage = payload.message;
      });
  },
});

export const { setShowRateModal, setShowRatingsModal } = songReducer.actions;

export default songReducer.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { get, post, del } from "../../utils/network";
import Artist from "../../types/artist";
import Rating from "../../types/rating";
import ToastStatus from "../../types/toast";
import { isAxiosError } from "axios";

export type ArtistState = {
  artistPending: boolean;
  artistFulfilled: boolean;
  artistRejected: boolean;
  artist?: Artist;
  artistErrorMessage?: string;
  similarArtistsPending: boolean;
  similarArtistsFulfilled: boolean;
  similarArtistsRejected: boolean;
  similarArtists?: Artist[];
  similarArtistsErrorMessage?: string;
  ratingsPending: boolean;
  ratingsFulfilled: boolean;
  ratingsRejected: boolean;
  ratings?: Rating[];
  ratingsErrorMessage?: string;
  rateArtistPending: boolean;
  rateArtistFulfilled: boolean;
  rateArtistRejected: boolean;
  rateArtistErrorMessage?: string;
  removeRatingPending: boolean;
  removeRatingFulfilled: boolean;
  removeRatingRejected: boolean;
  removeRatingErrorMessage?: string;
  showRateModal: boolean;
  showRatingsModal: boolean;
  showAboutModal: boolean;
  toastStatus: ToastStatus;
};

const initialState: ArtistState = {
  artistPending: false,
  artistFulfilled: false,
  artistRejected: false,
  similarArtistsPending: false,
  similarArtistsFulfilled: false,
  similarArtistsRejected: false,
  similarArtists: [],
  ratingsPending: false,
  ratingsFulfilled: false,
  ratingsRejected: false,
  ratings: [],
  rateArtistPending: false,
  rateArtistFulfilled: false,
  rateArtistRejected: false,
  removeRatingPending: false,
  removeRatingFulfilled: false,
  removeRatingRejected: false,
  showRateModal: false,
  showRatingsModal: false,
  showAboutModal: false,
  toastStatus: { show: false },
};

export const getArtist = createAsyncThunk(
  "artists/getArtist",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/artist/${id}`);

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

export const getSimilarArtists = createAsyncThunk(
  "artists/getSimilarArtists",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/artist/similarArtists/${id}`);

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
  "artists/getRatings",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/artist/ratings/${id}`);

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

export const rateArtist = createAsyncThunk(
  "artists/rateArtist",
  async ({ id, rating }: { id: string, rating: number }, thunkAPI) => {
    try {
      const { data, status } = await post(`/artist/rate/${id}`, { rating });

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
  "artists/removeRating",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await del(`/artist/removeRating/${id}`);

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

const artistReducer = createSlice({
  name: "artistReducer",
  initialState,
  reducers: {
    setShowRateModal: (state, action: PayloadAction<boolean>) => {
      state.showRateModal = action.payload;
    },
    setShowRatingsModal: (state, action: PayloadAction<boolean>) => {
      state.showRatingsModal = action.payload;
    },
    setShowAboutModal: (state, action: PayloadAction<boolean>) => {
      state.showAboutModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtist.pending, (state) => {
        state.artistPending = true;
        state.artistRejected = false;
        state.artistFulfilled = false;
      })
      .addCase(getArtist.fulfilled, (state, { payload }) => {
        state.artistPending = false;
        state.artistRejected = false;
        state.artistFulfilled = true;
        state.artist = payload.artist;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getArtist.rejected, (state, { payload }: { payload: any }) => {
        state.artistPending = false;
        state.artistRejected = true;
        state.artistErrorMessage = payload.message;
      })
      .addCase(getSimilarArtists.pending, (state) => {
        state.similarArtistsPending = true;
        state.similarArtistsRejected = false;
        state.similarArtists = [];
      })
      .addCase(getSimilarArtists.fulfilled, (state, { payload }) => {
        state.similarArtistsPending = false;
        state.similarArtistsRejected = false;
        state.similarArtistsFulfilled = true;
        state.similarArtists = payload.similarArtists;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getSimilarArtists.rejected, (state, { payload }: { payload: any }) => {
        state.similarArtistsPending = false;
        state.similarArtistsRejected = true;
        state.similarArtistsErrorMessage = payload.message;
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
      .addCase(rateArtist.pending, (state) => {
        state.rateArtistPending = true;
        state.rateArtistRejected = false;
        state.rateArtistFulfilled = false;
      })
      .addCase(rateArtist.fulfilled, (state, { payload }) => {
        state.rateArtistPending = false;
        state.rateArtistRejected = false;
        state.rateArtistFulfilled = true;
        state.artist = payload.artist;
        state.showRateModal = false;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(rateArtist.rejected, (state, { payload }: { payload: any }) => {
        state.rateArtistPending = false;
        state.rateArtistRejected = true;
        state.rateArtistErrorMessage = payload.message;
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
        state.artist = payload.artist;
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

export const { setShowRateModal, setShowRatingsModal, setShowAboutModal } = artistReducer.actions;

export default artistReducer.reducer;

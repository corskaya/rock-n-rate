import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { get, post, del } from "../../utils/network";
import Album from "../../types/album";
import Rating from "../../types/rating";
import ToastStatus from "../../types/toast";
import { isAxiosError } from "axios";

export type AlbumState = {
  albumPending: boolean;
  albumFulfilled: boolean;
  albumRejected: boolean;
  album?: Album;
  albumErrorMessage?: string;
  similarAlbumsPending: boolean;
  similarAlbumsFulfilled: boolean;
  similarAlbumsRejected: boolean;
  similarAlbums?: Album[];
  similarAlbumsErrorMessage?: string;
  ratingsPending: boolean;
  ratingsFulfilled: boolean;
  ratingsRejected: boolean;
  ratings?: Rating[];
  ratingsErrorMessage?: string;
  rateAlbumPending: boolean;
  rateAlbumFulfilled: boolean;
  rateAlbumRejected: boolean;
  rateAlbumErrorMessage?: string;
  removeRatingPending: boolean;
  removeRatingFulfilled: boolean;
  removeRatingRejected: boolean;
  removeRatingErrorMessage?: string;
  showRateModal: boolean;
  showRatingsModal: boolean;
  showAboutModal: boolean;
  toastStatus: ToastStatus;
};

const initialState: AlbumState = {
  albumPending: false,
  albumFulfilled: false,
  albumRejected: false,
  similarAlbumsPending: false,
  similarAlbumsFulfilled: false,
  similarAlbumsRejected: false,
  similarAlbums: [],
  ratingsPending: false,
  ratingsFulfilled: false,
  ratingsRejected: false,
  ratings: [],
  rateAlbumPending: false,
  rateAlbumFulfilled: false,
  rateAlbumRejected: false,
  removeRatingPending: false,
  removeRatingFulfilled: false,
  removeRatingRejected: false,
  showRateModal: false,
  showRatingsModal: false,
  showAboutModal: false,
  toastStatus: { show: false },
};

export const getAlbum = createAsyncThunk(
  "albums/getAlbum",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/album/${id}`);

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

export const getSimilarAlbums = createAsyncThunk(
  "albums/getSimilarAlbums",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/album/similarAlbums/${id}`);

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
  "albums/getRatings",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/album/ratings/${id}`);

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

export const rateAlbum = createAsyncThunk(
  "albums/rateAlbum",
  async ({ id, rating }: { id: string, rating: number }, thunkAPI) => {
    try {
      const { data, status } = await post(`/album/rate/${id}`, { rating });

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
  "albums/removeRating",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await del(`/album/removeRating/${id}`);

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

const albumReducer = createSlice({
  name: "albumReducer",
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
      .addCase(getAlbum.pending, (state) => {
        state.albumPending = true;
        state.albumRejected = false;
        state.albumFulfilled = false;
      })
      .addCase(getAlbum.fulfilled, (state, { payload }) => {
        state.albumPending = false;
        state.albumRejected = false;
        state.albumFulfilled = true;
        state.album = payload.album;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getAlbum.rejected, (state, { payload }: { payload: any }) => {
        state.albumPending = false;
        state.albumRejected = true;
        state.albumErrorMessage = payload.message;
      })
      .addCase(getSimilarAlbums.pending, (state) => {
        state.similarAlbumsPending = true;
        state.similarAlbumsRejected = false;
        state.similarAlbums = [];
      })
      .addCase(getSimilarAlbums.fulfilled, (state, { payload }) => {
        state.similarAlbumsPending = false;
        state.similarAlbumsRejected = false;
        state.similarAlbumsFulfilled = true;
        state.similarAlbums = payload.similarAlbums;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getSimilarAlbums.rejected, (state, { payload }: { payload: any }) => {
        state.similarAlbumsPending = false;
        state.similarAlbumsRejected = true;
        state.similarAlbumsErrorMessage = payload.message;
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
      .addCase(rateAlbum.pending, (state) => {
        state.rateAlbumPending = true;
        state.rateAlbumRejected = false;
        state.rateAlbumFulfilled = false;
      })
      .addCase(rateAlbum.fulfilled, (state, { payload }) => {
        state.rateAlbumPending = false;
        state.rateAlbumRejected = false;
        state.rateAlbumFulfilled = true;
        state.album = payload.album;
        state.showRateModal = false;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(rateAlbum.rejected, (state, { payload }: { payload: any }) => {
        state.rateAlbumPending = false;
        state.rateAlbumRejected = true;
        state.rateAlbumErrorMessage = payload.message;
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
        state.album = payload.album;
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

export const { setShowRateModal, setShowRatingsModal, setShowAboutModal } = albumReducer.actions;

export default albumReducer.reducer;

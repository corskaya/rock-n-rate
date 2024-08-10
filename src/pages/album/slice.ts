import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { get, post, del, patch } from "../../utils/network";
import { CommentRequest, CommentsResponse } from "./types";
import Album from "../../types/album";
import Rating from "../../types/rating";
import ToastStatus from "../../types/toast";
import Comment from "../../types/comment";

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
  ratings: Rating[];
  ratingsErrorMessage?: string;
  rateAlbumPending: boolean;
  rateAlbumFulfilled: boolean;
  rateAlbumRejected: boolean;
  rateAlbumErrorMessage?: string;
  removeRatingPending: boolean;
  removeRatingFulfilled: boolean;
  removeRatingRejected: boolean;
  removeRatingErrorMessage?: string;
  commentsPending: boolean;
  commentsFulfilled: boolean;
  commentsRejected: boolean;
  comments: Comment[];
  commentsErrorMessage?: string;
  commentAlbumPending: boolean;
  commentAlbumFulfilled: boolean;
  commentAlbumRejected: boolean;
  commentAlbumErrorMessage?: string;
  removeCommentPending: boolean;
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
  commentsPending: false,
  commentsFulfilled: false,
  commentsRejected: false,
  comments: [],
  commentAlbumPending: false,
  commentAlbumFulfilled: false,
  commentAlbumRejected: false,
  removeCommentPending: false,
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

export const getComments = createAsyncThunk(
  "albums/getComments",
  async (id: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/comment/album/${id}`);

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

export const commentAlbum = createAsyncThunk(
  "albums/commentAlbum",
  async (body: CommentRequest, thunkAPI) => {
    try {
      const { data, status } = await post("/comment", body);

      if (status !== 201) {
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

export const likeComment = createAsyncThunk(
  "albums/likeComment",
  async (commentId: string, thunkAPI) => {
    try {
      const { data, status } = await patch(`/comment/like/${commentId}`);

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

export const unlikeComment = createAsyncThunk(
  "albums/unlikeComment",
  async (commentId: string, thunkAPI) => {
    try {
      const { data, status } = await patch(`/comment/unlike/${commentId}`);

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

export const removeComment = createAsyncThunk(
  "albums/removeComment",
  async (commentId: string, thunkAPI) => {
    try {
      const { data, status } = await del(`/comment/${commentId}`);

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
    setToastStatus: (state, action: PayloadAction<ToastStatus>) => {
      state.toastStatus = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    }
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
      })
      .addCase(getComments.pending, (state) => {
        state.commentsPending = true;
        state.commentsRejected = false;
        state.commentsFulfilled = false;
        state.comments = [];
      })
      .addCase(getComments.fulfilled, (state, { payload }: { payload: CommentsResponse }) => {
        state.commentsPending = false;
        state.commentsRejected = false;
        state.commentsFulfilled = true;
        state.comments = payload.comments;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getComments.rejected, (state, { payload }: { payload: any }) => {
        state.commentsPending = false;
        state.commentsRejected = true;
        state.commentsErrorMessage = payload.message;
      })
      .addCase(commentAlbum.pending, (state) => {
        state.commentAlbumPending = true;
        state.commentAlbumRejected = false;
        state.commentAlbumFulfilled = false;
      })
      .addCase(commentAlbum.fulfilled, (state, { payload }: { payload: Comment }) => {
        state.commentAlbumPending = false;
        state.commentAlbumRejected = false;
        state.commentAlbumFulfilled = true;
        state.comments = [
          payload,
          ...state.comments
        ];
        state.toastStatus = {
          show: true,
          title: "Successful",
          message: "Comment has been added successfully.",
          type: "success",
        };
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(commentAlbum.rejected, (state, { payload }: { payload: any }) => {
        state.commentAlbumPending = false;
        state.commentAlbumRejected = true;
        state.commentAlbumErrorMessage = payload.message;
      })
      .addCase(removeComment.pending, (state) => {
        state.removeCommentPending = true;
      })
      .addCase(removeComment.fulfilled, (state, { payload }: { payload: Comment }) => {
        state.removeCommentPending = false;
        const commentsCopy = [...state.comments];
        state.comments = commentsCopy.filter((comment) => {
          return comment._id !== payload._id;
        });
        state.toastStatus = {
          show: true,
          title: "Successful",
          message: "Comment has been removed successfully.",
          type: "success",
        };
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(removeComment.rejected, (state, { payload }: { payload: any }) => {
        state.removeCommentPending = false;
        state.toastStatus = {
          show: true,
          title: "Error",
          message: payload.message,
          type: "error",
        };
      });
  },
});

export const {
  setShowRateModal, 
  setShowRatingsModal, 
  setShowAboutModal,
  setToastStatus, 
  setComments,
} = albumReducer.actions;

export default albumReducer.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { get, post, del, patch } from "../../utils/network";
import { CommentRequest, CommentsResponse, SongOverview } from "./types";
import Song from "../../types/song";
import Rating from "../../types/rating";
import ToastStatus from "../../types/toast";
import Comment from "../../types/comment";

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
  overviewPending: boolean;
  overviewFulfilled: boolean;
  overviewRejected: boolean;
  overview?: SongOverview;
  overviewErrorMessage?: string;
  ratingsPending: boolean;
  ratingsFulfilled: boolean;
  ratingsRejected: boolean;
  ratings: Rating[];
  ratingsErrorMessage?: string;
  rateSongPending: boolean;
  rateSongFulfilled: boolean;
  rateSongRejected: boolean;
  rateSongErrorMessage?: string;
  removeRatingPending: boolean;
  removeRatingFulfilled: boolean;
  removeRatingRejected: boolean;
  removeRatingErrorMessage?: string;
  commentsPending: boolean;
  commentsFulfilled: boolean;
  commentsRejected: boolean;
  comments: Comment[];
  commentsErrorMessage?: string;
  commentSongPending: boolean;
  commentSongFulfilled: boolean;
  commentSongRejected: boolean;
  commentSongErrorMessage?: string;
  removeCommentPending: boolean;
  showRateModal: boolean;
  showRatingsModal: boolean;
  showAboutModal: boolean;
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
  overviewPending: false,
  overviewFulfilled: false,
  overviewRejected: false,
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
  commentsPending: false,
  commentsFulfilled: false,
  commentsRejected: false,
  comments: [],
  commentSongPending: false,
  commentSongFulfilled: false,
  commentSongRejected: false,
  removeCommentPending: false,
  showRateModal: false,
  showRatingsModal: false,
  showAboutModal: false,
  toastStatus: { show: false },
};

export const getSong = createAsyncThunk(
  "songs/getSong",
  async (slug: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/${slug}`);

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
  async (slug: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/similarSongs/${slug}`);

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

export const getOverview = createAsyncThunk(
  "songs/getOverview",
  async (slug: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/overview/${slug}`);

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
  async (slug: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/song/ratings/${slug}`);

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
  async ({ slug, rating }: { slug: string, rating: number }, thunkAPI) => {
    try {
      const { data, status } = await post(`/song/rate/${slug}`, { rating });

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
  async (slug: string, thunkAPI) => {
    try {
      const { data, status } = await del(`/song/removeRating/${slug}`);

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
  "songs/getComments",
  async (topicSlug: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/comment/song/${topicSlug}`);

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

export const commentSong = createAsyncThunk(
  "songs/commentSong",
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
  "songs/likeComment",
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
  "songs/unlikeComment",
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
  "songs/removeComment",
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
      .addCase(getOverview.pending, (state) => {
        state.overviewPending = true;
        state.overviewRejected = false;
        state.overview = undefined;
      })
      .addCase(getOverview.fulfilled, (state, { payload }) => {
        state.overviewPending = false;
        state.overviewRejected = false;
        state.overviewFulfilled = true;
        state.overview = payload.overview;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getOverview.rejected, (state, { payload }: { payload: any }) => {
        state.overviewPending = false;
        state.overviewRejected = true;
        state.overviewErrorMessage = payload.message;
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
      .addCase(commentSong.pending, (state) => {
        state.commentSongPending = true;
        state.commentSongRejected = false;
        state.commentSongFulfilled = false;
      })
      .addCase(commentSong.fulfilled, (state, { payload }: { payload: Comment }) => {
        state.commentSongPending = false;
        state.commentSongRejected = false;
        state.commentSongFulfilled = true;
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
      .addCase(commentSong.rejected, (state, { payload }: { payload: any }) => {
        state.commentSongPending = false;
        state.commentSongRejected = true;
        state.commentSongErrorMessage = payload.message;
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
} = songReducer.actions;

export default songReducer.reducer;

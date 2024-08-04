import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { CommonTopic } from "../../types/common";
import { get } from "../../utils/network";
import { SearchRequest, SearchResponse } from "./types";

export type SearchState = {
  searchTerm: string;
  topicsPending: boolean;
  topicsFulfilled: boolean;
  topicsRejected: boolean;
  errorMessage?: string;
  topics: CommonTopic[];
};

const initialState: SearchState = {
  searchTerm: "",
  topicsPending: false,
  topicsFulfilled: false,
  topicsRejected: false,
  topics: [],
};

export const getTopics = createAsyncThunk(
  "albums/getTopics",
  async ({ searchTerm, limit }: SearchRequest, thunkAPI) => {
    try {
      const { data, status } = await get("/quickSearch", { searchTerm, limit });

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

const searchReducer = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopics.pending, (state) => {
        state.topicsPending = true;
        state.topicsRejected = false;
        state.topicsFulfilled = false;
        state.topics = [];
      })
      .addCase(getTopics.fulfilled, (state, { payload }: { payload: SearchResponse }) => {
        state.topicsPending = false;
        state.topicsRejected = false;
        state.topicsFulfilled = true;
        state.topics = payload.result;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getTopics.rejected, (state, { payload }: { payload: any }) => {
        state.topicsPending = false;
        state.topicsRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export const { setSearchTerm } = searchReducer.actions;

export default searchReducer.reducer;

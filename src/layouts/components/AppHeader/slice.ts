import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { CommonResponse, CommonTopic } from "../../../types/common";
import { get } from "../../../utils/network";

export type HeaderState = {
  topicsPending: boolean;
  topicsFulfilled: boolean;
  topicsRejected: boolean;
  errorMessage?: string;
  topics: CommonTopic[];
};

const initialState: HeaderState = {
  topicsPending: false,
  topicsFulfilled: false,
  topicsRejected: false,
  topics: [],
};

export const getTopics = createAsyncThunk(
  "albums/getTopics",
  async (searchTerm: string, thunkAPI) => {
    try {
      const { data, status } = await get("/quickSearch", { searchTerm });

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

const headerReducer = createSlice({
  name: "headerReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopics.pending, (state) => {
        state.topicsPending = true;
        state.topicsRejected = false;
        state.topics = [];
      })
      .addCase(getTopics.fulfilled, (state, { payload }: { payload: CommonResponse }) => {
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

export default headerReducer.reducer;

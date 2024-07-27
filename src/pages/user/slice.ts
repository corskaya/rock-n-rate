import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../utils/network";
import User from "../../types/user";
import ToastStatus from "../../types/toast";
import { isAxiosError } from "axios";
import { UserResponse } from "./types";

export type UserState = {
  userPending: boolean;
  userFulfilled: boolean;
  userRejected: boolean;
  user?: User;
  userErrorMessage?: string;
  toastStatus: ToastStatus;
};

const initialState: UserState = {
  userPending: false,
  userFulfilled: false,
  userRejected: false,
  toastStatus: { show: false },
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (username: string, thunkAPI) => {
    try {
      const { data, status } = await get(`/user/${username}`);

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

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.userPending = true;
        state.userFulfilled = false;
        state.userRejected = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }: { payload: UserResponse }) => {
        state.userPending = false;
        state.userRejected = false;
        state.userFulfilled = true;
        state.user = payload.user;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(getUser.rejected, (state, { payload }: { payload: any }) => {
        state.userPending = false;
        state.userRejected = true;
        state.userErrorMessage = payload.message;
      });
  },
});

export default userReducer.reducer;

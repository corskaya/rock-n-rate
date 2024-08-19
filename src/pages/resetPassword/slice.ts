import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../utils/network";
import ToastStatus from "../../types/toast";
import { ResetPasswordRequest } from "./types";
import { isAxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export type ResetPasswordState = {
  resetPasswordPending: boolean;
  resetPasswordFulfilled: boolean;
  resetPasswordRejected: boolean;
  errorMessage?: string;
  toastStatus: ToastStatus;
};

const initialState: ResetPasswordState = {
  resetPasswordPending: false,
  resetPasswordFulfilled: false,
  resetPasswordRejected: false,
  toastStatus: { show: false },
};

export const resetPassword = createAsyncThunk(
  "resetPasswordReducer/resetPassword",
  async ({ body, navigate }: { body: ResetPasswordRequest, navigate: NavigateFunction }, thunkAPI) => {
    try {
      const { data, status } = await post("/user/resetPassword", body);

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      navigate("/login");
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

const resetPasswordReducer = createSlice({
  name: "resetPasswordReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordPending = true;
        state.resetPasswordRejected = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordPending = false;
        state.resetPasswordRejected = false;
        state.resetPasswordFulfilled = true;
        state.toastStatus = {
          show: true,
          title: "Successful",
          message: "Password reset successfully. Please log in.",
          type: "success",
        };
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(resetPassword.rejected, (state, { payload }: { payload: any }) => {
        state.resetPasswordPending = false;
        state.resetPasswordRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export default resetPasswordReducer.reducer;

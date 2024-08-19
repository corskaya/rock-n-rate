import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../utils/network";
import { isAxiosError } from "axios";

export type ForgotPasswordState = {
  forgotPasswordPending: boolean;
  forgotPasswordFulfilled: boolean;
  forgotPasswordRejected: boolean;
  errorMessage?: string;
};

const initialState: ForgotPasswordState = {
  forgotPasswordPending: false,
  forgotPasswordFulfilled: false,
  forgotPasswordRejected: false,
};

export const forgotPassword = createAsyncThunk(
  "forgotPasswordReducer/forgotPassword",
  async (email: string, thunkAPI) => {
    try {
      const { data, status } = await post("/user/forgotPassword", { email });

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

const forgotPasswordReducer = createSlice({
  name: "forgotPasswordReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordPending = true;
        state.forgotPasswordRejected = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordPending = false;
        state.forgotPasswordRejected = false;
        state.forgotPasswordFulfilled = true;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(forgotPassword.rejected, (state, { payload }: { payload: any }) => {
        state.forgotPasswordPending = false;
        state.forgotPasswordRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export default forgotPasswordReducer.reducer;

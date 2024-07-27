import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../utils/network";
import ToastStatus from "../../types/toast";
import { isAxiosError } from "axios";
import { RegisterRequest } from "./types";
import { NavigateFunction } from "react-router-dom";

export type RegisterState = {
  registerPending: boolean;
  registerFulfilled: boolean;
  registerRejected: boolean;
  errorMessage?: string;
  toastStatus: ToastStatus;
};

const initialState: RegisterState = {
  registerPending: false,
  registerFulfilled: false,
  registerRejected: false,
  toastStatus: { show: false },
};

export const register = createAsyncThunk(
  "registerReducer/register",
  async ({ body, navigate }: { body: RegisterRequest, navigate: NavigateFunction }, thunkAPI) => {
    try {
      const { data, status } = await post("/user/register", body);

      if (status !== 201) {
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

const registerReducer = createSlice({
  name: "registerReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerPending = true;
        state.registerRejected = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.registerPending = false;
        state.registerRejected = false;
        state.registerFulfilled = true;
        state.toastStatus = {
          show: true,
          title: "Successful",
          message: "Account registered. Please login.",
          type: "info",
        };
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(register.rejected, (state, { payload }: { payload: any }) => {
        state.registerPending = false;
        state.registerRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export default registerReducer.reducer;

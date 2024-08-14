import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { post } from "../../utils/network";
import { ActivationRequest, ActivationResponse } from "./types";
import ToastStatus from "../../types/toast";
import { setLoginStatus } from "../login/slice";

export type ActivationState = {
  activatePending: boolean;
  activateFulfilled: boolean;
  activateRejected: boolean;
  errorMessage?: string;
  toastStatus: ToastStatus;
};

const initialState: ActivationState = {
  activatePending: false,
  activateFulfilled: false,
  activateRejected: false,
  toastStatus: { show: false },
};

export const activate = createAsyncThunk<ActivationResponse, ActivationRequest>(
  "activationReducer/activate",
  async (body, thunkAPI) => {
    try {
      const { data, status } = await post("/user/activate", body);

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      thunkAPI.dispatch(setLoginStatus({ user: data.user, token: data.token }));

      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.response?.data || e);
      }
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const activationReducer = createSlice({
  name: "activationReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(activate.pending, (state) => {
        state.activatePending = true;
        state.activateRejected = false;
      })
      .addCase(activate.fulfilled, (state) => {
        state.activatePending = false;
        state.activateRejected = false;
        state.activateFulfilled = true;
        state.toastStatus = {
          show: true,
          title: "Successful",
          message: "Account activated successfully.",
          type: "success",
        };
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(activate.rejected, (state, { payload }: { payload: any }) => {
        state.activatePending = false;
        state.activateRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export default activationReducer.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { post } from "../../utils/network.ts";
import User from "../../types/user";
import ToastStatus from "../../types/toast";
import { LoginRequest, LoginResponse } from "./types.ts";
import { isAxiosError } from "axios";

export type LoginState = {
  loginPending: boolean;
  loginFulfilled: boolean;
  loginRejected: boolean;
  user?: User;
  token?: string;
  errorMessage?: string;
  toastStatus: ToastStatus;
};

const initialState: LoginState = {
  loginPending: false,
  loginFulfilled: false,
  loginRejected: false,
  toastStatus: { show: false },
};

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "loginReducer/login",
  async (body: LoginRequest, thunkAPI) => {
    try {
      const { data, status } = await post("/user/login", body);

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

const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.user = undefined;
      state.token = undefined;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      action.payload.navigate("/");
    },
    setToastStatus: (state, action) => {
      state.toastStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginPending = true;
        state.loginRejected = false;
      })
      .addCase(login.fulfilled, (state, { payload }: { payload: LoginResponse }) => {
        state.loginPending = false;
        state.loginRejected = false;
        state.loginFulfilled = true;
        state.user = payload.user;
        state.token = payload.token;
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(login.rejected, (state, { payload }: { payload: any }) => {
        state.loginPending = false;
        state.loginRejected = true;
        state.errorMessage = payload.message;
      });
  },
});

export const { setLoginStatus, logout, setToastStatus } = loginReducer.actions;

export default loginReducer.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LangState = {
  language: string;
};

const initialState: LangState = {
  language: "en"
};

const langReducer = createSlice({
  name: "langReducer",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      localStorage.setItem("lang", action.payload);
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = langReducer.actions;

export default langReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  someValue: string | null;
}

const initialState: AppState = {
  someValue: null,
};

export const counterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSomeValue: (state, action: PayloadAction<string>) => {
      state.someValue = action.payload;
    },
  },
});

export const { setSomeValue } = counterSlice.actions;

export default counterSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ConfigState = {
  flags: {
    hasLaunched: boolean;
  };
};

const initialState: ConfigState = {
  flags: {
    hasLaunched: false,
  },
};

export const configState = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setFlagValue: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.flags = { ...state.flags, ...action.payload };
    },
  },
});

export const { setFlagValue } = configState.actions;

export const ConfigReducer = configState.reducer;

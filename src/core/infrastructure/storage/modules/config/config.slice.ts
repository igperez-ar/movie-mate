import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  flags: {
    hasLaunched: boolean;
  };
}

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

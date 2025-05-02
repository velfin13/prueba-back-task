import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  loadingTable: boolean;
  loadingGlobal: boolean;
}

const initialState: LoadingState = {
  loadingTable: false,
  loadingGlobal: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingTable(state, action: PayloadAction<boolean>) {
      state.loadingTable = action.payload;
    },
    setLoadingGlobal(state, action: PayloadAction<boolean>) {
      state.loadingGlobal = action.payload;
    },
    resetLoading() {
      return initialState;
    },
  },
});

export const { setLoadingTable, setLoadingGlobal, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

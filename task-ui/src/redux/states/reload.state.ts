import { createSlice } from '@reduxjs/toolkit';

export const reloadSlice = createSlice({
  name: 'reload',
  initialState: false,
  reducers: {
    setReload(_, action) {  
      return action.payload;
    },
  },
});

export const { setReload } = reloadSlice.actions;
export default reloadSlice.reducer;

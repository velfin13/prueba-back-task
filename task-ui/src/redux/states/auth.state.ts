import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthLocalStorage, LocalStorageTypes } from '@/models';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utilities';

const storedToken = getLocalStorage(LocalStorageTypes.TOKEN);

const initialState: AuthLocalStorage = {
  token: typeof storedToken === 'string' ? storedToken : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<string>) {
      state.token = action.payload;
      setLocalStorage(LocalStorageTypes.TOKEN, action.payload);
    },
    removeAuth(state) {
      state.token = null;
      removeLocalStorage(LocalStorageTypes.TOKEN);
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;

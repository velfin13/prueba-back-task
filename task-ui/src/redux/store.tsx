import { authSlice, loadingSlice, reloadSlice } from "@/redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    reload: reloadSlice.reducer,
    loading: loadingSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
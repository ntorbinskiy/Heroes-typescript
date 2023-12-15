import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filters";
import heroes from "./slices/heroes";

const store = configureStore({
  reducer: {
    filters,
    heroes,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

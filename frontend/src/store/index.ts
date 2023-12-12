import { configureStore, Middleware } from "@reduxjs/toolkit";

import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const stringMiddleware: Middleware = () => (next) => (action: unknown) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

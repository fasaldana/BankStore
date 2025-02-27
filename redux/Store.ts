import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/ProductSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

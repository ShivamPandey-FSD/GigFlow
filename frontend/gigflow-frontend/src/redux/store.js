// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import gigsReducer from "./slices/gigSlice";
import bidsReducer from "./slices/bidSlice";

export const store = configureStore({
 reducer: {
  gigs: gigsReducer,
  bids: bidsReducer
 },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchBids = createAsyncThunk(
 "bids/fetchBids",
 async (gigId, { rejectWithValue }) => {
  try {
   const res = await api.get(`/bids/${gigId}`);
   console.log(res.data)
   return res.data;
  } catch (err) {
   return rejectWithValue(err.response?.data?.message || "Failed to fetch bids");
  }
 }
);

export const fetchAllBids = createAsyncThunk(
 "bids/fetchBids",
 async (_, { rejectWithValue }) => {
  try {
   const res = await api.get('/bids');
   console.log(res.data)
   return res.data;
  } catch (err) {
   return rejectWithValue(err.response?.data?.message || "Failed to fetch bids");
  }
 }
);

export const createBid = createAsyncThunk(
 "bids/createBid",
 async (bidData, { rejectWithValue }) => {
  console.log(bidData)
  try {
   const res = await api.post("/bids", bidData);
   return res.data;
  } catch (err) {
   return rejectWithValue(err.response?.data?.message || "Failed to create bid");
  }
 }
);

export const hireBid = createAsyncThunk(
 "bids/hireBid",
 async (bidId, { rejectWithValue }) => {
  try {
   const res = await api.patch(`/bids/${bidId}/hire`);
   return res.data;
  } catch (err) {
   return rejectWithValue(err.response?.data?.message || "Failed to create bid");
  }
 }
);


const bidsSlice = createSlice({
 name: "bids",
 initialState: {
  allBids: [],
  loading: false,
  error: null,
 },
 reducers: {},
 extraReducers: (builder) => {
  builder
   .addCase(fetchBids.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchBids.fulfilled, (state, action) => {
    state.loading = false;
    state.allBids = action.payload;
   })
   .addCase(fetchBids.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   })
   .addCase(createBid.pending, (state) => {
    state.loading = true;
   })
   .addCase(createBid.fulfilled, (state, action) => {
    state.loading = false;
    state.allBigs.unshift(action.payload); // add new gig instantly
   })
   .addCase(createBid.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   });
 },
});

export default bidsSlice.reducer;

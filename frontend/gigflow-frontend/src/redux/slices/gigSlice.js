import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchGigs = createAsyncThunk(
  "gigs/fetchGigs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/gigs");
      console.log(res.data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch gigs");
    }
  }
);

export const createGig = createAsyncThunk(
  "gigs/createGig",
  async (gigData, { rejectWithValue }) => {
    console.log(gigData)
    try {
      const res = await api.post("/gigs", gigData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create gig");
    }
  }
);


const gigsSlice = createSlice({
  name: "gigs",
  initialState: {
    allGigs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.allGigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false;
        state.allGigs.unshift(action.payload); // add new gig instantly
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gigsSlice.reducer;

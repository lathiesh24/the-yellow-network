import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest } from "../../hooks"; // Import the getRequest utility function

interface SpotlightContent {
  heading: string;
  body: string;
}

interface Spotlight {
  spotlight_title: string;
  spotlight_content: SpotlightContent[];
  spotlight_img: string;
}

interface SpotlightState {
  spotlights: Spotlight[];
  error: string | null;
  loading: boolean;
}

const initialState: SpotlightState = {
  spotlights: [],
  error: null,
  loading: false,
};

export const fetchSpotlights = createAsyncThunk<
  Spotlight[],
  void,
  { rejectValue: string }
>(
  'spotlights/fetchSpotlights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest('http://localhost:8000/spotlight/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch spotlights");
    }
  }
);

const spotlightSlice = createSlice({
  name: "spotlights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpotlights.fulfilled, (state, action: PayloadAction<Spotlight[]>) => {
        state.spotlights = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpotlights.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch spotlights";
        state.loading = false;
      });
  },
});

export default spotlightSlice.reducer;

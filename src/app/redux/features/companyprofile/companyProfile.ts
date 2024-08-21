import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StartupType } from "../../../interfaces";
import { getRequestWithAccessToken } from "../../hooks";
import axios from 'axios';

// Define the state shape for company profiles
interface CompanyProfileState {
  companies: StartupType[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}


// Initial state
const initialState: CompanyProfileState = {
  companies: [],
  loading: false,
  error: null,
  hasMore: true,
};

export const fetchCompanies = createAsyncThunk(
  'companyProfile/fetchCompanies',
  async ({ page, page_size }: { page: number, page_size: number }, { rejectWithValue }) => {
    try {
      const response = await getRequestWithAccessToken(
        `http://127.0.0.1:8000/directorysearch/companyview/?page=${page}&page_size=${page_size}`, 
      );

    await new Promise(resolve => setTimeout(resolve, 1000));
    
      return response.data.results;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue('No more data');
      }
      return rejectWithValue('An error occurred while fetching data');
    }
  }
);



// Thunk to fetch a single company by ID
export const fetchCompanyById = createAsyncThunk<
  StartupType,
  string,
  { rejectValue: string }
>("companyProfile/fetchCompanyById", async (id, { rejectWithValue }) => {
  try {
    const response = await getRequestWithAccessToken(
      `http://127.0.0.1:8000/directorysearch/companyview/${id}/`
    );
    return response.data.results;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || `Error in fetching company with ID: ${id}`
    );
  }
});


const companyProfileSlice = createSlice({
  name: 'companyProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        state.hasMore = false;  
      } else {
        state.companies = [...state.companies, ...action.payload];
      }
      state.loading = false;
    });
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      state.loading = false;
      if (action.payload === 'No more data') {
        state.hasMore = false;
      } else {
        state.error = action.error.message || 'Something went wrong';
      }
    });
  },
});


export default companyProfileSlice.reducer;

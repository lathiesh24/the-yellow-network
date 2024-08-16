import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StartupType } from "../../../interfaces";
import { getRequestWithAccessToken } from "../../hooks";

// Define the state shape for company profiles
export interface CompanyProfileState {
  loading: boolean;
  companies: StartupType[];
  company: StartupType | null;
  error: string | null;
}

// Initial state
const initialState: CompanyProfileState = {
  loading: false,
  companies: [],
  company: null,
  error: null,
};

// Thunk to fetch all companies
export const fetchCompanies = createAsyncThunk<
  StartupType[],
  void,
  { rejectValue: string }
>("companyProfile/fetchCompanies", async (_, { rejectWithValue }) => {
  try {
    const response = await getRequestWithAccessToken(
      `http://127.0.0.1:8000/directorysearch/companyview/`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error in fetching companies"
    );
  }
});

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
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || `Error in fetching company with ID: ${id}`
    );
  }
});

// Create the slice
const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all companies
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<StartupType[]>) => {
          state.companies = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchCompanies.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch companies";
          state.loading = false;
        }
      );

    // Fetch a company by ID
    builder
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCompanyById.fulfilled,
        (state, action: PayloadAction<StartupType>) => {
          state.company = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchCompanyById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch company by ID";
          state.loading = false;
        }
      );
  },
});

export default companyProfileSlice.reducer;

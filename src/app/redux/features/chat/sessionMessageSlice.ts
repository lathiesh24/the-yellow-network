import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StartupType } from "../../../interfaces";
import { getRequestWithAccessToken } from "../../hooks";

// Define the ChatResponseType and ConversationType interfaces
interface ChatResponseType {
  success: boolean;
  category: string;
  response: string;
  startups: Array<{
    name: string;
    description: string;
    database_info: StartupType;
  }>;
}

interface ConversationType {
  question: string;
  response: ChatResponseType;
}

// Define the SessionMessageState interface
export interface SessionMessageState {
  loading: boolean;
  conversations: ConversationType[];
  error: string | null;
}

// Define the initial state
const initialState: SessionMessageState = {
  loading: false,
  conversations: [],
  error: null,
};

// Create the async thunk for fetching session messages
export const fetchSessionMessages = createAsyncThunk<
  ConversationType[], // Return type
  string, // Parameter type
  { rejectValue: string } // Rejection type
>(
  "sessionMessages/fetchSessionMessages",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getRequestWithAccessToken(
        `http://127.0.0.1:8000/prompt/convo/${id}`
      );
      const data = response.data.conversations;
      return data;
    } catch (error: any) {
      // Ensure proper error typing
      return rejectWithValue(
        error.response?.data || "Error in fetching conversations using session"
      );
    }
  }
);

// Create the slice
const sessionMessageSlice = createSlice({
  name: "sessionMessage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSessionMessages.fulfilled,
        (state, action: PayloadAction<ConversationType[]>) => {
          state.conversations = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchSessionMessages.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to fetch session messages";
          state.loading = false;
        }
      );
  },
});

export default sessionMessageSlice.reducer;

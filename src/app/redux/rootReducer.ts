import { combineReducers } from "redux";
import chatHistorySlice from "./features/chatHistorySlice";
import userInfoSlice from "./features/auth/userInfoSlice";
import sessionMessageSlice from "./features/chat/sessionMessageSlice";

const rootReducer = combineReducers({
 chatHistory: chatHistorySlice,
 userInfo: userInfoSlice,
 sessionMessage: sessionMessageSlice
});

export default rootReducer;
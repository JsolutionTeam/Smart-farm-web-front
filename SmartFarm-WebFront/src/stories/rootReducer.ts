import { combineReducers } from "redux";
import counterReducer from "./counter/reducer";
import modalReducer from "./modal/reducer";

const rootReducer = combineReducers({ counterReducer, modalReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

import { combineReducers } from "redux";
import siteReducer from "./site/reducer";

const rootReducer = combineReducers({
  siteReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

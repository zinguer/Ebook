import { combineReducers } from "redux";

import userReducer from "./reducer";
import ebookReducer from "./ebookReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
	userReducer,
	ebookReducer,
	commentReducer,
});

export default rootReducer;

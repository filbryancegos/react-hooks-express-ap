import { combineReducers } from "redux";
import employees from "./employees";
import modal from "./modal";

export default combineReducers({
	employees,
	modal
});
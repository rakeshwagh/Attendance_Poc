// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "../Slices/FormSlice"; // Your FORM reducer
import lookupReducer from "../Slices/LookupsSlice";
import loggedInUserReducer from "../Slices/LoginUserSlice";

const rootReducer = combineReducers({
  form: formReducer,
  lookups: lookupReducer,
  loggedinuser: loggedInUserReducer,
  // Add other reducers here if needed
});

export default rootReducer;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Redux/Reducer";
import LookupsSlice from "./Redux/Slices/LookupsSlice";

const store = configureStore({
  reducer: rootReducer,
  lookupsreducer: LookupsSlice,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

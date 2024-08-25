import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  hasFormChanges: false,
  // Add other relevant state properties here...
};

const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.data = action.payload.data;
      state.hasFormChanges = false;
    },
    updateFormData: (state, action) => {
      state.data = action.payload.data;
      state.hasFormChanges = action.payload?.hasFormChanges || true;
    },
    updateFormDynamicData: (state, action) => {
      state.data = { ...state.data, ...action.payload.data };
      state.hasFormChanges = action.payload?.hasFormChanges || true;
    },
  },
});

export const { addFormData, updateFormData, updateFormDynamicData } =
  formSlice.actions;
export default formSlice.reducer;

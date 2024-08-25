import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeCount: 0,
  regionsLookup: null,
  TitlesLookup: null,
  rolesLookup: null,
  locationsLookup: null,
  interestsLookup: null,
};

const LookupsSlice = createSlice({
  name: "LookupsSlice",
  initialState,
  reducers: {
    setEmployeeCount: (state, action) => {
      state.employeeCount = action.payload;
    },
    setRegionsLookup: (state, action) => {
      state.regionsLookup = action.payload;
    },
    setRolesLookup: (state, action) => {
      state.rolesLookup = action.payload;
    },
    setTitlesLookup: (state, action) => {
      state.TitlesLookup = action.payload;
    },
    setLocationsLooup: (state, action) => {
      state.locationsLookup = action.payload;
    },
    setInterestsLookup: (state, action) => {
      state.interestsLookup = action.payload;
    },
  },
});

export const {
  setEmployeeCount,
  setRolesLookup,
  setRegionsLookup,
  setLocationsLooup,
  setTitlesLookup,
  setInterestsLookup,
} = LookupsSlice.actions;
export default LookupsSlice.reducer;

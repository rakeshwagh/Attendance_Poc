import { get, ref } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import {
  setEmployeeCount,
  setLocationsLooup,
  setRegionsLookup,
  setTitlesLookup,
  setRolesLookup,
  setInterestsLookup,
} from "../Redux/Slices";

export const GetRegionLookupApi = async (dispatch) => {
  try {
    const regionsRef = ref(db, "regions");
    const snapshot = await get(regionsRef);
    const regions = [];
    Object.keys(snapshot.val()).map((key) => {
      regions.push({ ...snapshot.val()[key], id: key });
    });
    dispatch(setRegionsLookup(regions));
    return regions;
  } catch (error) {
    console.error("Error fetching regions: ", error);
  }
};

export const GetTitleLookupApi = async (dispatch) => {
  try {
    const TitleRef = ref(db, "Titles");
    const snapshot = await get(TitleRef);
    const Titles = [];
    Object.keys(snapshot.val()).map((key) => {
      Titles.push({ ...snapshot.val()[key], id: key });
    });
    dispatch(setTitlesLookup(Titles));
  } catch (error) {
    console.error("Error fetching Titles: ", error);
  }
};

export const GetLocationLookupApi = async (dispatch) => {
  try {
    const locationRef = ref(db, "locations");
    const snapshot = await get(locationRef);
    const locations = [];
    Object.keys(snapshot.val()).map((key) => {
      locations.push({ ...snapshot.val()[key], id: key });
    });
    dispatch(setLocationsLooup(locations));
  } catch (error) {
    console.error("Error fetching locations: ", error);
  }
};

export const GetInterestLookupApi = async (dispatch) => {
  try {
    const interestRef = ref(db, "interests");
    const snapshot = await get(interestRef);
    const interests = [];
    Object.keys(snapshot.val()).map((key) => {
      interests.push({ ...snapshot.val()[key], id: key });
    });
    dispatch(setInterestsLookup(interests));
  } catch (error) {
    console.error("Error fetching EmployeeInterests: ", error);
  }
};

export const GetRolesLookup = async (dispatch) => {
  try {
    const roleRef = ref(db, "Roles");
    const snapshot = await get(roleRef);
    const roles = [];
    Object.keys(snapshot.val()).map((key) => {
      roles.push({ ...snapshot.val()[key], id: key });
    });
    dispatch(setRolesLookup(roles));
  } catch (error) {
    console.error("Error fetching EmployeeInterests: ", error);
  }
};

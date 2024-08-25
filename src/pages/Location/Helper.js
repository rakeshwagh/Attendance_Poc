import { onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

export const addLocation = async (newLocation) => {
  try {
    const locationsRef = ref(db, "locations");
    const newLocationRef = await push(locationsRef);
    const locationId = newLocationRef.key;
    await update(ref(db, `locations/${locationId}`), {
      id: locationId,
      ...newLocation,
      isDelete: false,
    });
    return { id: locationId, ...newLocation };
  } catch (error) {
    console.error("Error adding location: ", error);
    throw error;
  }
};
export const fetchLocations = (setLocations) => {
  const locationsRef = ref(db, "locations");
  onValue(locationsRef, (snapshot) => {
    const data = snapshot.val();
    const locationData = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    setLocations(locationData);
  });
};

export const deleteLocation = async (locationId) => {
  try {
    const locationRef = ref(db, `locations/${locationId}`);
    await update(locationRef, { isDelete: true });
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};
export const updateLocation = async (data) => {
  const locationRef = ref(db, `/locations/${data.id}`);
  return update(locationRef, data)
    .then(() => {
      //console.log("Location data updated successfully");
    })
    .catch((error) => {
      //console.error("Error updating user data:", error);
    });
};

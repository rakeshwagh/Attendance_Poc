import { onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

export const addRegion = async (newRegion) => {
  try {
    const regionsRef = ref(db, "regions");
    const newRegionRef = await push(regionsRef); // Push generates a new unique key
    const regionId = newRegionRef.key; // Get the generated key (Title ID)
    await update(ref(db, `regions/${regionId}`), {
      id: regionId,
      ...newRegion,
      isDelete: false,
    });
    return { id: regionId, ...newRegion };
  } catch (error) {
    console.error("Error adding region: ", error);
    throw error; // Throw error to handle it in the calling function
  }
};

export const fetchRegions = (setRegions) => {
  const regionsRef = ref(db, "regions");
  onValue(regionsRef, (snapshot) => {
    const data = snapshot.val();
    const regionData = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    setRegions(regionData);
  });
};

export const deleteRegion = async (regionId) => {
  try {
    const regionRef = ref(db, `regions/${regionId}`);
    await update(regionRef, { isDelete: true });
  } catch (error) {
    console.error("Error updating region:", error);
    throw error; // Throw error to handle it in the calling function
  }
};
export const updateRegion = async (data) => {
  const regionRef = ref(db, `/regions/${data.id}`);
  return update(regionRef, data)
    .then(() => {
      // console.log("Region data updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
    });
};

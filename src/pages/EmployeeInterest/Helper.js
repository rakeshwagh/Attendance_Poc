import { db } from "../../firebase/firebaseConfig";
import { onValue, push, ref, update } from "firebase/database";

export const addInterest = async (newInterest) => {
  try {
    const interestsRef = ref(db, "interests");
    const newInterestRef = await push(interestsRef);
    const interestId = newInterestRef.key;
    await update(ref(db, `interests/${interestId}`), {
      id: interestId,
      ...newInterest,
      isDelete: false,
    });
    return { id: interestId, ...newInterest };
  } catch (error) {
    console.error("Error adding interest: ", error);
    throw error;
  }
};

export const fetchInterests = (setInterests) => {
  const interestsRef = ref(db, "interests");
  onValue(interestsRef, (snapshot) => {
    const data = snapshot.val();
    const interestData = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    setInterests(interestData);
  });
};

export const deleteInterest = async (interestId) => {
  try {
    const interestRef = ref(db, `interests/${interestId}`);
    await update(interestRef, { isDelete: true });
  } catch (error) {
    console.error("Error updating interest:", error);
    throw error;
  }
};

export const updateInterest = async (data) => {
  const interestRef = ref(db, `/interests/${data.id}`);
  return update(interestRef, data)
    .then(() => {})
    .catch((error) => {
      console.error("Error updating user data:", error);
    });
};

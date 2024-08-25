import { onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

export const addTitle = async (newTitle) => {
  try {
    const TitlesRef = ref(db, "Titles");
    const newTitleRef = await push(TitlesRef);
    const TitleId = newTitleRef.key;
    await update(ref(db, `Titles/${TitleId}`), {
      id: TitleId,
      ...newTitle,
      isDelete: false,
    });
    return { id: TitleId, ...newTitle };
  } catch (error) {
    console.error("Error adding Title: ", error);
    throw error;
  }
};

export const fetchTitles = (setTitles) => {
  const TitlesRef = ref(db, "Titles");
  onValue(TitlesRef, (snapshot) => {
    const data = snapshot.val();
    const TitleData = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    setTitles(TitleData);
  });
};

export const deleteTitle = async (TitleId) => {
  try {
    const TitleRef = ref(db, `Titles/${TitleId}`);
    await update(TitleRef, { isDelete: true });
  } catch (error) {
    console.error("Error updating Title:", error);
    throw error;
  }
};

export const updateTitle = async (data) => {
  const TitleRef = ref(db, `/Titles/${data.id}`);
  return update(TitleRef, data)
    .then(() => {
      //console.log("Title data updated successfully");
    })
    .catch((error) => {
      //console.error("Error updating user data:", error);
    });
};

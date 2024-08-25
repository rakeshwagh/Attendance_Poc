import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { get, onValue, push, ref, set, update } from "firebase/database";
import { setLoggedInUser, setLogout } from "../Redux/Slices/LoginUserSlice";
import { auth, db } from "./firebaseConfig";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (
  email,
  password,
  dispatch,
  navigate
) => {
  const res = signInWithEmailAndPassword(auth, email, password);
  res.then(async (data) => {
    const fetchData = await fetchUserById(data.user.uid);
    dispatch(setLoggedInUser(fetchData));
    sessionStorage.setItem("isAuthenticated", true);
    sessionStorage.setItem("loggedInUser", fetchData.name);
    navigate(fetchData.selflogin === true ? "/" : "/reset");
  });
  return res;
};

export const writeData = async (userDetails) => {
  const newDoc = push(ref(db, "Employee"));
  set(newDoc, userDetails)
    .then(() => {})
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const doSignOut = (dispatch) => {
  dispatch(setLogout());
  sessionStorage.removeItem("isAuthenticated");
  sessionStorage.removeItem("loggedInUser");
  return auth.signOut();
};

export const fetchEmployees = (setEmployees) => {
  const employeesRef = ref(db, "Employee");
  onValue(employeesRef, (snapshot) => {
    const data = snapshot.val();
    const employeesList = data
      ? Object.keys(data).map((item) => ({
          id: item,
          key: item,
          ...data[item],
        }))
      : [];
    setEmployees(employeesList);
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const fetchUserById = async (userId) => {
  try {
    const snapshot = await get(ref(db, `Employee/${userId}`));
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData;
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
};

export const updateUserById = async (userId, userData) => {
  const userRef = ref(db, `Employee/${userId}`);

  return update(userRef, userData)
    .then(() => {})
    .catch((error) => {
      console.error("Error updating user data:", error);
    });
};

export const doPasswordReset = async (oldPassword, newPassword) => {
  const user = auth.currentUser;
  try {
    await updatePassword(user, newPassword);
    const userId = user.uid;
    const userRef = ref(db, `Employee/${userId}`);
    await update(userRef, { selflogin: true });

    return "Password has been successfully reset.";
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetEmployeeCount = async () => {
  let count = 0;
  try {
    const employeeref = ref(db, "Employee");
    const snapshot = await get(employeeref);
    snapshot.forEach(() => {
      count++;
    });
    return count;
  } catch (error) {
    console.error("Error fetching employee count:", error);
    throw error;
  }
};

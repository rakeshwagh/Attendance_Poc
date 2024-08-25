import { onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

export const addRole = async (newrole) => {
  try {
    const roleRef = ref(db, "Roles");
    const newRoleRef = await push(roleRef);
    const roleId = newRoleRef.key;
    await update(ref(db, `Roles/${roleId}`), {
      id: roleId,
      ...newrole,
      isDelete: false,
    });
    return { id: roleId, ...newrole };
  } catch (error) {
    console.error("Error adding Role: ", error);
    throw error;
  }
};

export const fetchRoles = (setRoles) => {
  const roleRef = ref(db, "Roles");
  onValue(roleRef, (snapshot) => {
    const data = snapshot.val();
    const roleData = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    setRoles(roleData);
  });
};

export const deleteRole = async (roleId) => {
  try {
    const roleRef = ref(db, `Roles/${roleId}`);
    await update(roleRef, { isDelete: true });
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

export const updateRole = async (data) => {
  const roleRef = ref(db, `/Roles/${data.id}`);
  return update(roleRef, data)
    .then(() => {
      //console.log("Role data updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
    });
};

import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { db } from "../../../../firebase/firebaseConfig";

export const getReportToEmployees = (employeeGrade, setEmployees) => {
  const employeesRef = ref(db, "Employee");
  const userQuery = query(
    employeesRef,
    orderByChild("grade"),
    equalTo(employeeGrade)
  );
  onValue(userQuery, (snapshot) => {
    const data = snapshot.val();
    const employeesList = data
      ? Object.keys(data).map((item) => ({
          id: item,
          key: item,
          name: data[item].name,
        }))
      : [];

    console.log("employeesList", employeesList);
  });
};

export const getSelectedEmployee = async (employeeId) => {
  const employeeRef = ref(db, `Employee/${employeeId}`);
  let employeeData = null;
  await onValue(employeeRef, (snapshot) => {
    const data = snapshot.val();
    employeeData = data;
  });

  return employeeData;
};
export const submitUserForm = (data, lookups) => {
  const location = lookups.locationsLookup.find(
    (location) => location.id === data.locationId
  );
  const region = lookups.regionsLookup.find(
    (region) => region.id === data.regionId
  );
  const title = lookups.TitlesLookup.find((title) => title.id === data.titleId);
  const role = lookups.rolesLookup.find((role) => role.id === data.roleId);
  
  const getGrade = lookups.TitlesLookup.find((title) => title.name === data.title);
  
  const interests = lookups.interestsLookup.filter((interest) =>
    data.interests.includes(interest.id)
  ).map((interest) => ({name:interest.name, id:interest.id}));

  console.log(interests)
  
  // interestLookup

  let updatedUser = {
    ...data,
    interests: interests || "",
    location: location.name || "",
    region: data?.region || "",
    title: data?.title || "",
    grade: data?.grade || "",
    reportTo: data?.reportTo || "",
    reportToName: data?.reportToName || "",
    roleName: data?.roleName || "",
  }
}
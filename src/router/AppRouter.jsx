import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { roleIds } from "../Constant/CommonConstant";
import {
  GetInterestLookupApi,
  GetLocationLookupApi,
  GetRegionLookupApi,
  GetRolesLookup,
  GetTitleLookupApi,
} from "../GetApi/GetLookupApi";
import { auth } from "../firebase/firebaseConfig";
import { AuthLayout, BaseLayout } from "../layout";
import {
  Attendance,
  DashboardPage,
  EmployeeInterest,
  ErrorPage,
  Event,
  Location,
  Region,
  ResetPassword,
  Role,
  SignIn,
  SignUp,
  Title,
  Users,
} from "../pages";
import { Userlist } from "../pages/Users/Component/UserList/Userlist";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loggedInuser = useSelector((state) => state.loggedinuser.loggedInUser);

  const checkAuth = () => {
    const storedAuth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuth);
    setloading(false);
  };

  const fetchLookup = (dispatch) => {
    GetTitleLookupApi(dispatch);
    GetRolesLookup(dispatch);
    GetInterestLookupApi(dispatch);
    GetLocationLookupApi(dispatch);
    GetRegionLookupApi(dispatch);
  };

  const checkRole = () => {
    if (!loggedInuser || !loggedInuser?.role) {
      return false;
    }
    const userRoleIds = loggedInuser?.role.map((role) => role.id);
    const res =
      userRoleIds.includes(roleIds.admin) || userRoleIds.includes(roleIds.hr);
    return res;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setloading(false);
    });
    fetchLookup(dispatch);
    checkAuth();
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Route>
      {isAuthenticated ? (
        <Route element={<BaseLayout />}>
          <Route path="/" element={<DashboardPage />} />
          {loggedInuser && loggedInuser.role && (
            <>
              {checkRole() ? (
                <>
                  <Route path="/users/*" element={<Users />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/makeattendance" element={<Attendance />} />
                  <Route path="/title" element={<Title />} />
                  <Route path="/role" element={<Role />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/region" element={<Region />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/interests" element={<EmployeeInterest />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/users" element={<Userlist />} />
                </>
              )}
            </>
          )}
          <Route path="/*" element={<ErrorPage code={401} />} />
        </Route>
      ) : (
        <Route path="/*" element={<Navigate to="/signin" />} />
      )}
    </Routes>
  );
};

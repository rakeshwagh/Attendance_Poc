import { Breadcrumb, Form } from "antd";
import { Content } from "antd/es/layout/layout";
import { get, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  fetchUserById,
  updateUserById,
} from "../../../../firebase/auth";
import { db } from "../../../../firebase/firebaseConfig";
import "./UpsertUser.scss";
import { UpsertUserForm } from "./UpsertUserForm";
import { getReportToEmployees, getSelectedEmployee, submitUserForm } from "./UpsertHelper";

export const UpsertUser = () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const TitlesLookup = useSelector((state) => state.lookups.TitlesLookup);
  const locationLookup = useSelector((state) => state.lookups.locationsLookup);
  const regionsLookup = useSelector((state) => state.lookups.regionsLookup);
  const rolesLookup = useSelector((state) => state.lookups.rolesLookup);
  const interestLookup = useSelector((state) => state.lookups.interestsLookup);
  const lookups = useSelector((state) => state.lookups);

  const { userId } = useParams();
  const isEditing = userId !== undefined;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    name: "",
    nationality: "",
    gender: "",
    maritalStatus: "",
    email: "",
    phoneNumber: "",
    region: "",
    location: "",
    title: "",
    role: [],
    titleId: "",
    locationId: "",
    regionId: "",
    interests: [],
    password: "User@123",
    grade: "",
  });

  useEffect(() => {
    getReportToEmployees(7);
  }, []);

  const fetchCountries = () => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      });
  };

  useEffect(() => {
    //Fetching Countries
    if (countries.length === 0) {
      fetchCountries();
    }

    //Edit Profile
    if (isEditing) {
      getSelectedEmployee(userId).then((user) => {
        console.log("user", user);
        if (user) {
          let updatedUser = {
            ...user,
            gender: user?.gender || "",
            interests: user?.interests || "",
            location: user?.location || "",
            locationId: user?.locationId || "",
            maritalStatus: user?.maritalStatus || "",
            middleName: user?.middleName || "",
            name: user?.name || "",
            nationality: user?.nationality || "",
            nationalityId: user?.nationalityId || "",
            region: user?.region || "",
            regionId: user?.regionId || "",
            title: user?.title || "",
            titleId: user?.titleId || "",
            grade: user?.grade || "",
            reportTo: user?.reportTo || "",
            reportToName: user?.reportToName || "",
            roleId: user?.roleId || "",
            roleName: user?.roleName || "",
          };
          form.setFieldsValue(updatedUser);
        } else {
          navigate("/users");
          throw new Error("User not found in database");
        }
      });
    }
  }, [userId, dispatch]);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
  };

  const onFinish = async (data) => {
    if(isEditing){
      submitUserForm(data, lookups);
    }

    // try {
    //   if (isEditing) {
    //     await updateUserById(userId, {
    //       ...formData,
    //       updatedAt: new Date().toISOString(),
    //       interests: formData.interests,
    //       grade: getGrade.grade,
    //     });
    //   } else {
    //     await doCreateUserWithEmailAndPassword(
    //       formData.email,
    //       formData.password
    //     ).then(async (data) => {
    //       await set(ref(db, `Employee/${data.user.uid}`), {
    //         userId: data.user.uid,
    //         ...formData,
    //         createdAt: new Date().toISOString(),
    //         createdBy: loggedInUser,
    //         selflogin: false,
    //         grade: getGrade.grade,
    //       });
    //     });
    //   }
    //   navigate("/users");
    // } catch (error) {
    //   console.error("Error:", error.message);
    // }
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/users">Employees</Link> },
          { title: isEditing ? "Edit" : "Create" },
        ]}
      />

      <Content className="content position-relative">
        <div className="upserUser">
          <UpsertUserForm
            form={form}
            filteredLocations={filteredLocations}
            setFilteredLocations={setFilteredLocations}
            countries={countries}
            regionsLookup={regionsLookup}
            TitlesLookup={TitlesLookup}
            locationLookup={locationLookup}
            rolesLookup={rolesLookup}
            interestLookup={interestLookup}
            setFormData={setFormData}
            handleChange={handleChange}
            onFinish={onFinish}
            formData={formData}
            isEditing={isEditing}
          />
        </div>
      </Content>
    </>
  );
};

import React from "react";
import { Route, Routes } from "react-router-dom";
import { UpsertUser } from "./Component/UpsertUser/UpsertUser";
import { Userlist } from "./Component/UserList/Userlist";
import { ViewUser } from "./Component/ViewProfile/ViewProfile";

export const Users = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Userlist />} />
        <Route path="create" element={<UpsertUser />} />
        <Route path="edit/:userId" element={<UpsertUser />} />
        <Route path="view/:userId" element={<ViewUser />} />
      </Routes>
    </>
  );
};

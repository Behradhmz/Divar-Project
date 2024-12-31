import React from "react";
import Categoryfrom from "../components/templates/Categoryfrom";
import CategoryList from "../components/templates/CategoryList";

const AdminPage = () => {
  return (
    <div>
      <CategoryList />
      <Categoryfrom />
    </div>
  );
};

export default AdminPage;

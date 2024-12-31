import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import Error404 from "../pages/Error404";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../Services/user";
import Loader from "../modules/Loader";
import Postinfo from "../pages/Postinfo";

const Router = () => {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);

  if (isLoading) return <Loader />;

  console.log({ data, isLoading, error });
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <Dashboard /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            // <Navigate to="/" />
            <AdminPage />
          )
        }
      />
      <Route path="*" element={<Error404 />} />
      <Route path="/:id" element={<Postinfo />} />
    </Routes>
  );
};

export default Router;

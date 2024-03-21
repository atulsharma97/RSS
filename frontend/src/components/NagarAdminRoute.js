import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export default function NagarAdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return userInfo?.data?.role === "nagarAdmin" ? children : <Navigate to="/" />;
}

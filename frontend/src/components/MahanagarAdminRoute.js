import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export default function MahanagarAdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return userInfo?.data?.role === "mahaNagarAdmin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

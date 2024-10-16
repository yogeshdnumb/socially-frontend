//import classes from "./RequireAuth.module.scss";

import { authContext } from "@/contexts/userContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

export default function RequireAuth() {
  const { auth } = useContext(authContext);
  if (!auth?.id) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}

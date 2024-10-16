import Router from "./Router";
import { UserContext } from "./contexts/userContext.ts";
import { useUser } from "./hooks/useUser.ts";
import UserProvider from "./providers/UserProvider.tsx";
import { api } from "./utils/api.ts";
import "@fontsource/inter";
// Defaults to weight 400
import "@fontsource/montserrat";
// Defaults to weight 400
import "@fontsource/roboto";
import { Spinner } from "@nextui-org/react";
// Defaults to weight 400
import { useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    async function get() {
      try {
        const response = await api.get("/auth/status");
        // console.log(response);

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          console.log("else");

          navigate("/login");
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);

        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    }
    get();
  }, [navigate, setUser]);

  if (isLoading) return <Spinner></Spinner>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router />
      <ToastContainer autoClose={1000} />
    </UserContext.Provider>
  );
}

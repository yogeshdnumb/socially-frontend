import DefaultLayout from "./features/DefaultLayout/DefaultLayout";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Route, Routes } from "react-router-dom";

// const routes = createBrowserRouter([{ path: "/", element: <Home /> }]);

export default function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route element={<HomePage />} path="/"></Route>
        <Route element={<ProfilePage />} path="/profile/:userId"></Route>
        <Route element={<FriendsPage />} path="/friends"></Route>
        <Route element={<RegisterPage />} path="/register"></Route>
      </Route>
      <Route element={<LoginPage />} path="/login"></Route>
    </Routes>
  );
}

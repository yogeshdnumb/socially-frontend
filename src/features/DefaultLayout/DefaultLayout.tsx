//import classes from "./DefaultLayout.module.scss";

import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SideBar from "./components/SideBar/SideBar";

export default function DefaultLayout() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col max-w-7xl mx-auto">
        <NavigationBar />
        <div className="flex-1 flex gap-2 p-4 ">
          {/* <div className="sm:visible hidden"> */}
          <SideBar />
          {/* </div> */}
          <Outlet />
        </div>
      </div>
    </main>
  );
}

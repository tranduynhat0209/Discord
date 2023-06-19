import { Outlet } from "react-router-dom";
import "./DarkMode.scss";
import ServerList from "./HomeIcon/ServerList";

export default function DarkMode() {
  return (
    <div className="dark-mode">
      <ServerList />

      <div className="main-content">
        <Outlet/>
      </div>
    </div>
  );
}

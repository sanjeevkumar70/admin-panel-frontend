import "./DashboardLayout.scss";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [click, setClick] = useState(window.innerWidth < 768 ? true : false);

  useEffect(() => {
    const temp = document.querySelector(".app-wrapper");
    if (temp) {
      temp.classList.toggle("sidebar-collapse", click);
    }
  }, [click]);

  return (
    <>
      <div className="app-wrapper">
        <Sidebar click={click} setClick={setClick} />
        <div className="main-content">
          <Header click={click} setClick={setClick} />
          {children}
        </div>
      </div>
    </>
  );
}
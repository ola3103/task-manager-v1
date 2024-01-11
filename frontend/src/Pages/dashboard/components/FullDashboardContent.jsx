import { useEffect, useState } from "react";
import DashboardContent from "./DashboardContent";
import SideBar from "./SideBar";

function FullDashboardContent() {
  return (
    <main className="full-dashboard-content">
      <SideBar />
      <DashboardContent />
    </main>
  );
}

export default FullDashboardContent;

// AppShell.jsx
import { useState, useEffect } from "react";
import { useApp } from "../../context/FinanceContext";
import Dashboard from "../../pages/Dashboard";
import Transactions from "../../pages/Transactions";
import Insights from "../insights/InsightsPanel";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { exportTransactions } from "../../utils/export";
import "../../styles/index.css"; 
import "../../styles/App.css"; 

function AppShell() {
  const { darkMode, activeTab } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  return (
    <div className="app">
      {/* Sidebar overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        className={sidebarOpen ? "open" : ""}
      />

      {/* Main content */}
      <main className="main">
        <Header
          setSidebarOpen={setSidebarOpen}
          exportJSON={exportTransactions}
        />

        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "transactions" && <Transactions />}
        {activeTab === "insights" && <Insights />}
      </main>
    </div>
  );
}

export default AppShell;

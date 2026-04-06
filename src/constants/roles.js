import { faChartPie, faTable, faChartColumn, } from "@fortawesome/free-solid-svg-icons";

export const TABS = [
  { id: "dashboard", label: "Dashboard", icon: faChartPie },
  { id: "transactions", label: "Transactions", icon: faTable },
  { id: "insights", label: "Insights", icon: faChartColumn },
];

export const ROLES = ["admin", "viewer"];

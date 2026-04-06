import { AppProvider } from "./context/FinanceContext";
import AppShell from "./components/layout/AppShell";

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
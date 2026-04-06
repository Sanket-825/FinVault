import { useApp } from "../context/FinanceContext";
import SummaryCards from "../components/dashboard/SummaryCards";
import MonthlyChart from "../components/charts/MonthlyChart";
import CategoryChart from "../components/charts/CategoryChart";

function Dashboard() {
  const {
    monthlyData,
    categorySpend,
  } = useApp();
  const totalCatExpense = categorySpend.reduce((s, c) => s + c.amt, 0);
  return (
    <div className="content">
      <SummaryCards/>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-title">
            Monthly Overview{" "}
            <span className="chart-subtitle">Income vs Expenses</span>
          </div>
          {monthlyData.length ? (
            <MonthlyChart data={monthlyData} />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <div>No data</div>
            </div>
          )}
        </div>
        <div className="chart-card">
          <div className="chart-title">Spending Breakdown</div>
          {categorySpend.length ? (
            <CategoryChart data={categorySpend} total={totalCatExpense} />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🍩</div>
              <div>No data</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
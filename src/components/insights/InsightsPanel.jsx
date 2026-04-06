import { useApp } from "../../context/FinanceContext";
import {
  getSavingsRate,
  getTotalCategorySpend,
  getAvgIncome,
  getAvgExpense,
  getTop3Percentage,
  getRentPercentage,
  getExpenseTrend
} from "../../utils/insightCalculations";

import { CATEGORY_ICONS, CATEGORY_COLORS } from "../../constants/categories";
import { fmt } from "../../utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Insights() {
  const { categorySpend, monthlyData, totalIncome, totalExpenses } = useApp();

  const top = categorySpend[0];
  const totalCat = getTotalCategorySpend(categorySpend);
  const savingsRate = getSavingsRate(totalIncome, totalExpenses);
  const avgIncome = getAvgIncome(monthlyData);
  const avgExpense = getAvgExpense(monthlyData);
  const rentPct = getRentPercentage(categorySpend, totalCat);
  const top3Pct = getTop3Percentage(categorySpend, totalCat);
  const trend = getExpenseTrend(monthlyData);

  return (
    <div className="content">
      <div className="insights-grid">

        {/* Top Category */}
        <div className="insight-card">
          <div className="insight-title">🏆 Top Spending Categories</div>

          {top ? (
            <>
              <div className="insight-highlight flex-col">
                <div className="font-big">
                  <FontAwesomeIcon icon={CATEGORY_ICONS[top.cat]} />
                </div>
                <div className="insight-big">{top.cat}</div>
                <div className="insight-sub">
                  {fmt(top.amt)} — {(top.amt / totalCat * 100).toFixed(0)}% of all spending
                </div>
              </div>

              {categorySpend.slice(0, 6).map((c, i) => (
                <div key={i} className="spend-bar-row">
                  <div className="spend-bar-label flex-row">
                    <FontAwesomeIcon icon={CATEGORY_ICONS[c.cat]} />
                    <span>{c.cat}</span>
                  </div>
                  <div className="spend-bar-track">
                    <div
                      className="spend-bar-fill"
                      style={{
                        width: `${(c.amt / top.amt) * 100}%`,
                        background: CATEGORY_COLORS[c.cat] || "var(--gold)"
                      }}
                    />
                  </div>
                  <div className="spend-bar-amt">{fmt(c.amt)}</div>
                </div>
              ))}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
            </div>
          )}
        </div>

        {/* Monthly Comparison */}
        <div className="insight-card">
          <div className="insight-title">📅 Monthly Comparison</div>

          {monthlyData.map((m, i) => {
            const net = m.income - m.expense;
            return (
              <div key={i} className="comparison-row flex-row" style={{ justifyContent: "space-between" }}>
                <div className="comp-month">{new Date(m.month + "-01").toLocaleString("default", { month: "long", year: "numeric" })}</div>
                <div className="comp-vals flex-row" style={{ gap: 6 }}>
                  <span className="text-green font-medium">+{fmt(m.income)}</span>
                  <span className="text-red font-medium">−{fmt(m.expense)}</span>
                  <span className={`${net >= 0 ? "text-green" : "text-red"} font-medium`}>
                    {net >= 0 ? "▲" : "▼"} {fmt(Math.abs(net))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Savings */}
        <div className="insight-card">
          <div className="insight-title">💰 Savings & Health Score</div>

          <div className="insight-highlight flex-col">
            <div className={`insight-big ${savingsRate > 20 ? "text-green" : savingsRate > 0 ? "text-gold" : "text-red"}`}>
              {savingsRate}%
            </div>
            <div className="insight-sub">Overall Savings Rate</div>
          </div>

          <div className="flex-col">
            <div className="card-padding flex-col">
              <div className="insight-sub">Avg Monthly Income</div>
              <div className="insight-big text-green">{fmt(avgIncome)}</div>
            </div>
            <div className="card-padding flex-col">
              <div className="insight-sub">Avg Monthly Expenses</div>
              <div className="insight-big text-red">{fmt(avgExpense)}</div>
            </div>
          </div>
        </div>

        {/* Observations */}
        <div className="insight-card">
          <div className="insight-title">🔍 Smart Observations</div>
          <div className="flex-col">
            {[
              {
                icon: "🏠",
                text: `Rent is ${rentPct}% of total expenses — ${rentPct !== "N/A" && +rentPct > 30 ? "consider reviewing housing costs" : "within healthy range"}`
              },
              { icon: "📈", text: trend },
              {
                icon: "💡",
                text: totalIncome > totalExpenses
                  ? `You saved ${fmt(totalIncome - totalExpenses)} overall — excellent financial discipline!`
                  : `Expenses exceed income by ${fmt(totalExpenses - totalIncome)} — review your budget`
              },
              {
                icon: "🎯",
                text: `Your top 3 expense categories account for ${top3Pct ? top3Pct.toFixed(0) + "%" : "N/A"} of all spending`
              }
            ].map((obs, i) => (
              <div key={i} className="card-padding flex-row">
                <span className="font-big">{obs.icon}</span>
                <span className="font-medium text-gray">{obs.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Insights;
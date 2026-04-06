import React from "react";
import { fmt } from "../../utils/formatters";

export default function MonthlyChart({ data }) {
  const MAX_PX = 130;
  const maxVal = Math.max(...data.flatMap(d => [d.income, d.expense]));

  return (
    <div className="monthly-chart-wrap">
      <div className="bar-chart">
        {data.map((d, i) => (
          <div key={i} className="bar-group">
            <div className="bar-pair">
              <div
                className="bar bar-income"
                title={`Income: ${fmt(d.income)}`}
                style={{ height: `${(d.income / maxVal) * MAX_PX}px` }}
              />
              <div
                className="bar bar-expense"
                title={`Expense: ${fmt(d.expense)}`}
                style={{ height: `${(d.expense / maxVal) * MAX_PX}px` }}
              />
            </div>
            <span className="bar-label">{d.month.slice(5)}</span>
          </div>
        ))}
      </div>

      <div className="bar-legend">
        <div className="legend-item">
          <div className="legend-dot legend-green" />
          <span>Income</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot legend-red" />
          <span>Expenses</span>
        </div>
      </div>
    </div>
  );
}
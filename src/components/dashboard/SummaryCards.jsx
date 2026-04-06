import { useApp } from "../../context/FinanceContext";
import { fmt } from "../../utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faArrowTrendUp,
  faArrowTrendDown
} from "@fortawesome/free-solid-svg-icons";

function SummaryCards() {
  const { balance, totalIncome, totalExpenses } = useApp();

  return (
    <div className="summary-grid">

      <div className="summary-card card-balance">
        <div className="card-label">Total Balance</div>
        <div className="card-amount">{fmt(balance)}</div>
        <div className="card-sub">Current financial position</div>
        <div className="card-icon"><FontAwesomeIcon icon={faWallet} /></div>
      </div>

      <div className="summary-card card-income">
        <div className="card-label">Total Income</div>
        <div className="card-amount">{fmt(totalIncome)}</div>
        <div className="card-sub">All income transactions</div>
        <div className="card-icon"><FontAwesomeIcon icon={faArrowTrendUp} /></div>
      </div>

      <div className="summary-card card-expense">
        <div className="card-label">Total Expense</div>
        <div className="card-amount">{fmt(totalExpenses)}</div>
        <div className="card-sub">All expense transactions</div>
        <div className="card-icon"><FontAwesomeIcon icon={faArrowTrendDown} /></div>
      </div>

    </div>
  );
}

export default SummaryCards;
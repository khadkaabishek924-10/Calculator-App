import { useEffect, useState } from "react";
import { Calculator as CalculatorIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getHistory } from "../utils/history";

function Navbar() {
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setHistoryCount(getHistory().length);

    updateCount();
    window.addEventListener("historyUpdated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("historyUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-200"
    }`;

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
        <NavLink
          to="/calculator"
          className="flex items-center gap-2 text-xl font-bold text-slate-800"
        >
          <CalculatorIcon className="h-7 w-7 text-blue-600" />
          <span>Calculator</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/calculator" className={linkStyle}>
            Calculator
          </NavLink>

          <NavLink to="/history" className={linkStyle}>
            History ({historyCount})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
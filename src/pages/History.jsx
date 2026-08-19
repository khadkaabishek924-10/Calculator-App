import { useEffect, useState } from "react";
import { Calculator as CalculatorIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import HistoryItem from "../components/HistoryItem";
import {
  getHistory,
  deleteHistoryItem,
  clearHistory,
} from "../utils/history";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());

    const updateHistory = () => {
      setHistory(getHistory());
    };

    window.addEventListener("historyUpdated", updateHistory);

    return () => {
      window.removeEventListener("historyUpdated", updateHistory);
    };
  }, []);

  const handleDelete = (id) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all calculation history?"
    );

    if (!confirmed) return;

    clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-[calc(100vh-81px)] px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Calculation History
            </h1>
            <p className="mt-2 text-slate-500">
              View your previous calculations.
            </p>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <Trash2 size={18} />
              Clear All History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <CalculatorIcon size={32} className="text-blue-600" />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              No calculation history yet.
            </h2>

            <p className="mt-2 text-slate-500">
              Your completed calculations will appear here.
            </p>

            <Link
              to="/calculator"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Open Calculator
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
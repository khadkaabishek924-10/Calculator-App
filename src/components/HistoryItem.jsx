import { Trash2 } from "lucide-react";

function HistoryItem({ item, onDelete }) {
  const formattedDate = new Date(item.date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-lg font-semibold text-slate-800">
          {item.calculation}
        </p>

        <p className="mt-1 text-xl font-bold text-blue-600">
          = {item.result}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {formattedDate}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={17} />
        Delete
      </button>
    </div>
  );
}

export default HistoryItem;
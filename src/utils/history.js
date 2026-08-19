const STORAGE_KEY = "calculator_history";

export function getHistory() {
  const savedHistory = localStorage.getItem(STORAGE_KEY);

  if (!savedHistory) {
    return [];
  }

  try {
    return JSON.parse(savedHistory);
  } catch {
    return [];
  }
}

export function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  window.dispatchEvent(new Event("historyUpdated"));
}

export function addHistory(calculation, result) {
  const history = getHistory();

  const newItem = {
    id: Date.now() + Math.random(),
    calculation,
    result,
    date: new Date().toISOString(),
  };

  history.unshift(newItem);
  saveHistory(history);
}

export function deleteHistoryItem(id) {
  const history = getHistory();
  saveHistory(history.filter((item) => item.id !== id));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("historyUpdated"));
}
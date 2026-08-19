import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Calculator from "./pages/Calculator";
import History from "./pages/History";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/calculator" replace />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
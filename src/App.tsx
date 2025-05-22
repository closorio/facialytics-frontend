// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RealTimePage from "./pages/RealTime";
import HistoryPage from "./pages/History";
import DashboardPage from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-darker text-light">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<RealTimePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

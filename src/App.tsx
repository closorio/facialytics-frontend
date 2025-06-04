// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RealTimePage from "./pages/RealTime";
import HistoryPage from "./pages/History";
import ImageCapturePage from "./pages/ImageCapture";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/realtime" element={<RealTimePage />} />
            <Route path="/img-capture" element={<ImageCapturePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import {
  FormulaDetailPage,
  FormulaHistoryPage,
  CalculatePage,
  HomePage,
  NotFoundPage,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="formula" element={<CalculatePage />} />
          <Route path="formula/:id" element={<FormulaDetailPage />} />
          <Route path="history" element={<FormulaHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

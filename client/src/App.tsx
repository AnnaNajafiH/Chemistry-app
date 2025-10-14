import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormulaProvider } from "./context/FormulaContext";
import { Layout } from "./components/layout/Layout";
import "./App.css";
import {
  HomePage,
  FormulaPage,
  FormulaHistoryPage,
  FormulaDetailPage,
  NotFoundPage,
} from "./pages";

function App() {
  return (
    <Router>
      <FormulaProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="formula" element={<FormulaPage />} />
            <Route path="formula/:id" element={<FormulaDetailPage />} />
            <Route path="history" element={<FormulaHistoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FormulaProvider>
    </Router>
  );
}

export default App;

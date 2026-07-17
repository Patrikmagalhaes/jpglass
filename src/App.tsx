import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendamento" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}
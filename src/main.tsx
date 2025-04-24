import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LostPage from "./pages/LostPage";
import FoundPage from "./pages/FoundPage";
import FOUNDITEMSPAGE from "./pages/FoundItemsPage";
import LOSTITEMS from "./pages/LostItemsPage";
import SIGNIN from "./LoginPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lostitem" element={<LostPage />} />
        <Route path="/founditem" element={<FoundPage />} />
        <Route path="/founditems" element={<FOUNDITEMSPAGE />} />
        <Route path="/lostitems" element={<LOSTITEMS />} />
        <Route path="/signin" element={<SIGNIN />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

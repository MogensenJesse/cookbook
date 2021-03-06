import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import Overview from "./pages/Overview";
import Recipe from "./pages/Recipe";
import ShoppingList from "./pages/ShoppingList";

import "./assets/css/main.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/overview/:recipeid" element={<Recipe />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Route>

        <Route
          path="*"
          element={
            <main>
              <p>There's nothing here!</p>
              <Link to="/">Let's get you back</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

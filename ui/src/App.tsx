import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { AddRecipe } from "./pages/AddRecipe/AddRecipe";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<AddRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

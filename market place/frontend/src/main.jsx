import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import ProductDetails from "./pages/ProductDetails";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<App />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;

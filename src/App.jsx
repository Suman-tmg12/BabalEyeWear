import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Company from "./pages/Company";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import SearchPage from "./pages/SearchPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { ProtectedRoute, GuestRoute } from "./components/RouteGuards";
import Collection from "./pages/Collection";
import CheckoutProcess from "./pages/CheckoutProcess";

function App() {
  return (
    <>
      <ScrollToTop />

      <div className="mb-23">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/company" element={<Company />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Only for logged-out visitors */}
        <Route path="/Auth/Register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/Auth/Login" element={<GuestRoute><Login /></GuestRoute>} />

        {/* Only for logged-in users */}
        <Route path="/UserProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

        {/* Shop */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/ProductDetailPage" element={<ProductDetailPage />} />

        <Route path="/Collection" element={<Collection/>} />
        <Route path="/cart" element={<CheckoutProcess />} />

        {/* Unknown URL */}
        <Route path="*" element={<Home />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Company from "./Company";
import Services from "./Services";
import Contact from "./Contact";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

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
      </Routes>
    </>
  );
}

export default App;

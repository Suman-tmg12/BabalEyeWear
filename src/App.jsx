import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Company from "./Company";
import Services from "./Services";
import Contact from "./Contact";
import Register from "./Auth/Register"; 
import Login from "./Auth/Login";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
        <Route path="/Auth/Register" element={<Register />}/>
        <Route path="/Auth/Login" element={<Login/>}></Route>
      </Routes>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
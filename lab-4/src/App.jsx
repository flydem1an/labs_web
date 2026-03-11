import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cabinet from "./pages/Cabinet";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Router>
            <div className="app">
                <Header />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/cabinet" element={<Cabinet />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
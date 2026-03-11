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

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/cabinet" element={<Cabinet />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
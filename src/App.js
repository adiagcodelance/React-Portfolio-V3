import "./App.css";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";

import Projects from "./pages/Projects.js";
import Social from "./pages/Social.js";
import Review from "./pages/Review.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/projects" Component={Projects} />
        <Route path="/socials" Component={Social} />
        <Route path="/reviews" Component={Review} />
      </Routes>
    </div>
  );
}

export default App;

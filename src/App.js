
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;

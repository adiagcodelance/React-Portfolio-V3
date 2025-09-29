
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminApp from "./admin/AdminApp";

// Configure Amplify
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </div>
  );
}

export default App;


import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminApp from "./admin/AdminApp";
import ApiTest from "./components/ApiTest";

// Configure Amplify
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App" style={{ paddingBottom: 40 }}>
      <header className="App-header"></header>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>

      {/* Dev/Test Panel for API */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        <ApiTest />
      </div>
    </div>
  );
}

export default App;

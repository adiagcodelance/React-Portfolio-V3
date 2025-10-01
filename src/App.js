
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdminApp from "./admin/AdminApp";

// Configure Amplify
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App" style={{ paddingBottom: 40 }}>
      {/* Minimal header with Login link */}
      <header className="App-header" style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'transparent', display: 'flex', justifyContent: 'flex-end',
        padding: '10px 16px'
      }}>
        <Link to="/admin/login" style={{
          padding: '6px 12px',
          border: '1px solid var(--accent, #d97706)',
          borderRadius: 6,
          color: 'var(--accent, #d97706)',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 600
        }}>
          Login
        </Link>
      </header>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </div>
  );
}

export default App;

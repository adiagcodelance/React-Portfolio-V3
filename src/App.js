
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Valentine from "./pages/Valentine";
import ValentineCelebration from "./pages/ValentineCelebration";
import AdminApp from "./admin/AdminApp";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/valentine" element={<Valentine />} />
      <Route path="/valentine/celebration" element={<ValentineCelebration />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}

export default App;

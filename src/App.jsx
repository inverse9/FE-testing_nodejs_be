import React, { useState } from "react";
import UserTable from "./UserTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/add-user" element={<Form />} />
          <Route path="/edit-user" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

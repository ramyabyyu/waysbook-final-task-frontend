import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <Container className="mt-5">
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

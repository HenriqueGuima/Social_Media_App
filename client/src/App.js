import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/Menu";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Container>
            <Menu />
            <Routes>
              {/* TO DO */}
              {/* RETRY PRIVATE ROUTES */}
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;

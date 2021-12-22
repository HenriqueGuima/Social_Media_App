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
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Container>
            <Menu />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/posts/:postId" element={<SinglePost />}></Route>
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;

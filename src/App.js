import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from './components/home/Home';
import './App.css';
import Page from './components/page/Page';
import Admin from './components/admin/Admin';
import AuthProvider from './context/AuthContext';
import Edit from './components/admin/Edit';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar expand="lg" className="p-4 bg-dark navbar-dark">
          <Container>
            <NavLink to="/" className="text-decoration-none">
              <Navbar.Brand>The WordPress API</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-5">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/page/:id" element={<Page />}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/admin/edit/:id" element={<Edit/>}/>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

import "./App.css";

import { useState, Fragment } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";

///Component Imports
import LandingPage from "./pages/LandingPage";
import MemberPage from "./pages/MemberPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

//Context Imports (may need to set the theme here if we want light/dark mode setup)

//MUI Stuff
//Create the theme and apply it around the whole app
import { createTheme, ThemeProvider } from "@mui/material";

const userTheme = createTheme({
  palette: {
    primary: {
      main: "#ef0dbf",
    },
    secondary: {
      main: "#0def3e",
    },
    footer: {
      main: "#fee0f4",
      text: "#ca009f",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={userTheme}>
      <Fragment>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/member" element={<MemberPage />} />
          // move these routes to be under the a master member page??
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <Footer />
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
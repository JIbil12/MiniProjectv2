import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HelloWorld from "./Helloworld.js";
import SignUpForm from "./components/SignUpForm.js";
import Home from "./components/Home.js";
import Fhome from "./components/Fhome.js";
import Calendar from "./materials/Calendar.js";
import CourseDiary from "./components/CourseDiary.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignUpForm />} />
        <Route path="/hello" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faculty_home" element={<Fhome />} />
        <Route path="/course_diary" element={<CourseDiary />} />
      </Routes>
    </Router>
  );
}

export default App;

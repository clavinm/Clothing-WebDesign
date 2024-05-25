// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/Home';
import ImageCapturePage from './features/ImageCapturePage';
import Notifications from './features/Notifications';
// import Trending from "./features/Trending"
// import Latest from "./features/Latest"
// import Navbar from "./features/navbar"
// import About from "./features/About"
// import Footer from "./features/Footer"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capture" element={<ImageCapturePage />} />
        <Route path="/notification" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;

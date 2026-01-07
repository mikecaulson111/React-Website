import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Pages:
import HomePage from "./pages/HomePage/HomePage.jsx"
import HelpPage from "./pages/HelpPage/HelpPage.jsx"
import AboutMePage from "./pages/AboutMe/AboutMe.jsx"
import MiaAndMe from "./pages/MiaAndMe/MiaAndMe.jsx"
import BouncingBlock from "./pages/PhysicsDemos/BouncingBlock.jsx"
import StandingWaves from "./pages/PhysicsDemos/StandingWaves.jsx"
import SpringWave from "./pages/PhysicsDemos/SpringWave.jsx"
import ScrollingTestingPage from "./pages/ScrollingTestingPage/ScrollingTestingPage.jsx"
import BlockGamePage from "./pages/PhysicsDemos/BlockGame.jsx"

// Images:
import CornerImage from "./components/CornerImage/CornerImage.jsx"

// Components:
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx"

function Name({name}) {
  return (
    <h1>{name}</h1>
  );
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <main>
          <CornerImage />
          <Name name="Michael Caulson" />
        </main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about-me" element={<AboutMePage />} />
          <Route path="/mia-and-me" element={<MiaAndMe />} />
          <Route path="/bouncing-blocks" element={<BouncingBlock />} />
          <Route path="/standing-waves" element={<StandingWaves />} />
          <Route path="/block-game" element={<BlockGamePage />} />
          <Route path="/spring-wave" element={<SpringWave />} />
          <Route path="/scrolling-testing" element={<ScrollingTestingPage />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

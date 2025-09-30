import "./App.css"

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import HelpPage from "./pages/HelpPage.jsx"
import CornerImage from "./components/CornerImage/CornerImage.jsx"

function Name({name}) {
  return (
    <h1>{name}</h1>
  );
}

function App() {
  return (
    <>
      <Router>
        <main>
          {/* <img src={catImage} className="corner-image top-right" /> */}
          <CornerImage />
          <Name name="Michael Caulson" />
        </main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

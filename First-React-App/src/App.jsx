import "./App.css"

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import HelpPage from "./pages/HelpPage.jsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

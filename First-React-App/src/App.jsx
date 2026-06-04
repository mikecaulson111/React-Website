import "./App.css"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import ReactGA from "react-ga4"

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
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard.jsx"
import Drawings from "./pages/Drawings/Drawings.jsx"
import ExpenseTracker from "./pages/ExpenseTracker/ExpenseTracker.jsx"
import RecipePage from "./pages/RecipePage/RecipePage.jsx"
import RecipeDetail from "./pages/RecipePage/RecipeDetail.jsx"
import SelectionSort from "./pages/CodingExamples/SelectionSort.jsx"

// Images:
import CornerImage from "./components/CornerImage/CornerImage.jsx"

// Components:
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx"
import ConstHeader from "./ConstHeader.jsx"
import { AuthProvider } from "./components/AuthContext/AuthContext.jsx"

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (MEASUREMENT_ID) {
  ReactGA.initialize(MEASUREMENT_ID,
                    {gtagOptions:{ debug_mode: import.meta.env.DEV}, gaOptions: {send_page_view: false}});
}

const RouteChangeTracker = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname + location.search});
  }, [location]);
  return null;
}

function App() {
  return (
    <>
      <AuthProvider>
      <Router>
        <ScrollToTop />
        <RouteChangeTracker />
        <ConstHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about-me" element={<AboutMePage />} />
          <Route path="/mia-and-me" element={<MiaAndMe />} />
          <Route path="/bouncing-blocks" element={<BouncingBlock />} />
          <Route path="/standing-waves" element={<StandingWaves />} />
          <Route path="/block-game" element={<BlockGamePage />} />
          <Route path="/spring-wave" element={<SpringWave />} />
          <Route path="/selection-sort" element={<SelectionSort />} />
          <Route path="/scrolling-testing" element={<ScrollingTestingPage />} />
          <Route path="/kanban-board" element={<KanbanBoard />} />
          <Route path="/drawings" element={<Drawings />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:recipeSlug" element={<RecipeDetail />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App

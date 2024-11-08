import AllGroups from "./pages/AllGroups"
import CreateGroup from "./pages/CreateGroup"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  
  return (
    <>
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<CreateGroup/>}/>
      <Route path="/all" element={<AllGroups/>}/>
    </Routes>
  </Router>
    </>
  )
}

export default App

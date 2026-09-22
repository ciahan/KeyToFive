import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Subjects from './pages/Subjects.jsx'
import Mission from './pages/Mission.jsx'
import Team from './pages/Team.jsx'
import './App.css'

// to-do:
// 1. make subunits
// 2. fix scrolling issue between pages
// 3. make the plateform a category pill thing that provides additional information when you hover over it
// 4. NoteStyle?
// 5. look into creating a notepad aesthetic for the white + green border containers, utlizing holes, rungs, blue and red lines, etc.
// 6. imbed remnote pages into the website (if possible)
// 7. link forms to website

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:subjectSlug" element={<Subjects />} />
        <Route path="/subjects/:subjectSlug/:noteSlug/*" element={<Subjects />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import './App.css'
import CompareYAML from './components/YamlCompare.jsx';
import Home from './components/Home.jsx';
import Convert from './components/YamlConvert.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/" element={<CompareYAML />} />
        <Route path="/home" element={<Home />} />
        <Route  path="/convert" element={<Convert />} ></Route>
      </Routes>
    </Router>
  )
}

export default App
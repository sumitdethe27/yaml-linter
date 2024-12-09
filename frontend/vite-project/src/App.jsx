import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import './App.css'
import CompareYAML from './components/YamlCompare.jsx';
import Home from './components/Home.jsx';
import Convert from './components/YamlConvert.jsx';
import LoginSignup from './components/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/compare" element={<ProtectedRoute> <CompareYAML /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute> <Home /></ProtectedRoute>} />
        <Route  path="/convert" element={<ProtectedRoute><Convert /> </ProtectedRoute>} ></Route>
        <Route  path="/auth" element={<LoginSignup/>} ></Route>
      </Routes>
    </Router>
  )
}

export default App
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';
import Ruler from './pages/Ruler';
import Optimum from './pages/Optimum-hp';
import Desp from './pages/Desp';
import Azote from './pages/Azote';


function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ruler" element={<Ruler />} />
        <Route path='/azote' element={<Azote />}/>
        <Route path="/desp" element={<Desp />}/>
        <Route path="/opti-hp" element={<Optimum />} />
      </Routes>
    </Router>
  )
}

export default App

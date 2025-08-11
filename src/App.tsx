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
      <div style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
      }}>
        <Header />
        <main className="py-2 px-1" style={{
          flex: 1,
          overflowY: 'auto'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ruler" element={<Ruler />} />
            <Route path='/azote' element={<Azote />}/>
            <Route path="/desp" element={<Desp />}/>
            <Route path="/opti-hp" element={<Optimum />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

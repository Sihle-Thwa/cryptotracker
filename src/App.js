import './App.css';
import NavBar from './Components/navbar/NavBar.jsx';
import Footer from './Components/footer/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './Articles/Articles.jsx';
import Overview from './Components/Overview.jsx';
import CoinOverview from './Components/CoinOverview.jsx';



function App() {

  return (
    <BrowserRouter>
      <div className='grid'>

        <nav>
          <NavBar />
        </nav>
        <header>
        </header>
        <aside className='sidebar-left'>
        </aside>
        <main>
          <Routes>

            <Route path='/' element={<Overview />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/coinoverview/:id' element={<CoinOverview />} />
          </Routes>
        </main>
        <aside className='sidebar-right'>
        </aside>

        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

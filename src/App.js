import './App.css';
import Dashboard from './Dashboard/Dashboard';
import NavBar from './Components/NavBar.jsx';
import Articles from './Articles/Articles'
import Footer from './Components/Footer.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/articles' element={<Articles />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

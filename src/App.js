import './App.css';
import Dashboard from './Dashboard/Dashboard';
import NavBar from './Components/navbar/NavBar.jsx';
import Footer from './Components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './Articles/Articles.jsx';



function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/articles' element={<Articles />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

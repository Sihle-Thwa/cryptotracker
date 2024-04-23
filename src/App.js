import './App.css';
import NavBar from './Components/navbar/NavBar.jsx';
import Footer from './Components/footer/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './Articles/Articles.jsx';
import Overview from './Components/Overview.jsx';
import '../src/styles.css'



function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/articles' element={<Articles />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

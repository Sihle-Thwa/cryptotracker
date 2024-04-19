import './App.css';
import Dashboard from './Dashboard/Dashboard';
import NavBar from './Components/NavBar.jsx';
import Articles from './Articles/Articles'
import Footer from './Components/Footer.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <NavBar />
      <Dashboard />
      <Articles />
      <Footer />
    </>
  );
}

export default App;

import { Outlet, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function Header() {
  return (
    <div>
      <NavBar />
    </div>
  );
}

function Main() {
  return (
    <div className="content">

    </div>
  );
}


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
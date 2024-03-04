import {BrowserRouter} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Users/Home';

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
        <Home />
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
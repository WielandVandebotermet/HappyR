import { Outlet, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import NavBar from './components/Nav&Footer/NavBar';
import Footer from './components/Nav&Footer/Footer';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import Groups from './components/Pages/Groups';
import Surveys from './components/Pages/Surveys';
import CreateSurveys from './components/Pages/CreateSurveys';

function Main() {
  return (
    <div className="content">
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/Profile'} element={<Profile/>}/>
        <Route path={'/Groups'} element={<Groups/>}/>
        <Route path={'/Surveys'} element={<Surveys/>}/>
        <Route path={'/CreateSurveys'} element={<CreateSurveys/>}/>
      </Routes>
      <Home />
    </div>
  );
}


function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
import { Outlet, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import NavBar from './components/Nav&Footer/NavBar';
import Footer from './components/Nav&Footer/Footer';
import Home from './components/Pages/Home';

import Profile from './components/Pages/Profile';

import Results from './components/Pages/Results';

import Groups from './components/Pages/Groups/Groups';
import GroupOverview from './components/Pages/Groups/GroupOverview';
import AddToGroup from './components/Pages/Groups/AddToGroup';

import Surveys from './components/Pages/Surveys/Surveys';
import NewSurveys from './components/Pages/Surveys/NewSurveys';
import CreateSurveys from './components/Pages/Surveys/CreateSurveys';
import CreateSurveysGroups from './components/Pages/Surveys/CreateSurveysGroups';

function Main() {
  return (
    <div className="content">
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/Profile'} element={<Profile/>}/>

        <Route path={'/Groups'} element={<Groups/>}/>
        <Route path={'/GroupOverview/:id'} element={<GroupOverview/>}/>
        <Route path={'/AddToGroup/:id'} element={<AddToGroup/>}/>
        
        <Route path={'/Surveys'} element={<Surveys/>}/>
        <Route path={'/NewSurveys'} element={<NewSurveys/>}/>
        <Route path={'/CreateSurveys'} element={<CreateSurveys/>}/>
        <Route path={'/CreateSurveysGroups'} element={<CreateSurveysGroups/>}/>

        <Route path={'/Results'} element={<Results/>}/>

      </Routes>
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
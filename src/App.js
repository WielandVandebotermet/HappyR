import { Outlet, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import NavBar from './components/Nav&Footer/NavBar';
import Footer from './components/Nav&Footer/Footer';
import Home from './Pages/Home';

import Profile from './Pages/Profile';

import Results from './Pages/Results';

import Groups from './Pages/Groups/Groups';
import GroupOverview from './Pages/Groups/GroupOverview';
import AddToGroup from './Pages/Groups/AddToGroup';

import Surveys from './Pages/Surveys/Surveys';
import NewSurveys from './Pages/Surveys/NewSurveys';
import CreateSurveys from './Pages/Surveys/CreateSurveys';
import CreateSurveysGroups from './Pages/Surveys/CreateSurveysGroups';

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
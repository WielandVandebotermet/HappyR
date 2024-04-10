import {Routes, Route, BrowserRouter} from 'react-router-dom';
import NavBar from './components/Nav&Footer/NavBar';
import Footer from './components/Nav&Footer/Footer';
import Home from './Pages/Home';

import Profile from './Pages/Profile';

import Results from './Pages/Results/Results';
import ResultOverview from './Pages/Results/ResultOverview';


import Groups from './Pages/Groups/Groups';
import GroupOverview from './Pages/Groups/GroupOverview';
import AddToGroup from './Pages/Groups/AddToGroup';

import SelectTemplate from './Pages/Templates/SelectTemplate';
import TemplateOptions from './Pages/Templates/TemplateOptions';
import ExternalPeople from './Pages/Templates/ExternalPeople';
import TemplateShowcase from './Pages/Templates/TemplateShowcase';

import SelectCategorie from './Pages/Categorie/SelectCategorie';
import CreateCategorie from './Pages/Categorie/CreateCategorie';

import Test from './Pages/Test/Test';

import Surveys from './Pages/Surveys/Surveys';
import NewSurveys from './Pages/Surveys/NewSurveys';
import CreateSurvey from './Pages/Surveys/CreateSurvey';

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
        <Route path={'/CreateSurvey/:id'} element={<CreateSurvey/>}/>

        <Route path={'/SelectTemplate/:Sid'} element={<SelectTemplate/>}/>
        <Route path={'/TemplateOptions/:Sid/:Qid/:Tid?'} element={<TemplateOptions/>}/>
        <Route path={'/ExternalPeople/:Sid/:Qid/:Tid?'} element={<ExternalPeople/>}/>
        <Route path={'/TemplateShowcase/'} element={<TemplateShowcase/>}/>

        <Route path={'/Test/:Sid'} element={<Test/>}/>

        <Route path={'/SelectCategorie/:Sid/:Qid/'} element={<SelectCategorie/>}/>
        <Route path={'/CreateCategorie/:Sid/:Qid/:Cid'} element={<CreateCategorie/>}/>

        <Route path={'/Results'} element={<Results/>}/>
        <Route path={'/ResultOverview/:Sid/'} element={<ResultOverview/>}/>
      </Routes>
    </div>
  );
}


function App() {
  return (
    <div className='relative min-h-screen'>
      <BrowserRouter >
        <NavBar />
        <Main/>
        <div className="pt-24">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
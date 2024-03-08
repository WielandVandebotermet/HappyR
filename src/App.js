import {Routes, Route, BrowserRouter} from 'react-router-dom';
import NavBar from './components/Nav&Footer/NavBar';
import Footer from './components/Nav&Footer/Footer';
import Home from './Pages/Home';

import Profile from './Pages/Profile';

import Results from './Pages/Results';

import Groups from './Pages/Groups/Groups';
import GroupOverview from './Pages/Groups/GroupOverview';
import AddToGroup from './Pages/Groups/AddToGroup';

import SelectTemplate from './Pages/Templates/SelectTemplate';
import TemplateOptions from './Pages/Templates/TemplateOptions';
import ExternalPeople from './Pages/Templates/ExternalPeople';
import TemplatePage from './Pages/Templates/TemplatePage';
import TemplateShowcase from './Pages/Templates/TemplateShowcase';

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

        <Route path={'/SelectTemplate/:id'} element={<SelectTemplate/>}/>
        <Route path={'/TemplateOptions/:Sid/:Tid'} element={<TemplateOptions/>}/>
        <Route path={'/ExternalPeople/:id'} element={<ExternalPeople/>}/>
        <Route path={'/TemplatePage/:Sid/Tid'} element={<TemplatePage/>}/>
        <Route path={'/TemplateShowcase/:Sid/Tid'} element={<TemplateShowcase/>}/>

        <Route path={'/Results'} element={<Results/>}/>
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
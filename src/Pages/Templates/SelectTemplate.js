import { Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import TemplatesAPi from "../../API/TemplatesAPi";
import NewSurveysApi from "../../API/NewSurveysApi";

function Groups() {
  const { Sid } = useParams();
  const [q, setQ] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [survey, setSurvey] = useState([]);
  const navigate = useNavigate();

  const getTemplates = async () => {
    try {
      const templatesAPi = new TemplatesAPi();
      const result = await templatesAPi.all();
      setTemplates(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const getSurvey = async () => {
    try {
      const surveysApi = new NewSurveysApi();
      const data = await surveysApi.getGroupById(Sid);
      setSurvey(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const handleToggleChange = (Option, questionIndex) => {
    setSurvey(prevSurvey => {
      const question = { ...prevSurvey.Questions[questionIndex] };
      const updatedOptions = { ...question.Options };
      updatedOptions[Option] = !updatedOptions[Option];
  

  
      question.Options = updatedOptions;
      prevSurvey.Questions[questionIndex] = question;

      console.log(Option + ": " + prevSurvey.Questions[questionIndex].Options[Option]);
      return prevSurvey;
    });
  };

  const Back = () => {
    if(q === 0) {
      navigate(-1);
    };
    if(q !== 0) {
      setQ(q-1);
    };
  };

  const Next = () => {
    setQ(q+1);
  };
  
  const Finish = () => {
    navigate(-1);
  };

  useEffect(() => {
    getTemplates();
    getSurvey();
  }, []);

  if (!survey) {
    return (<p>Loading...</p>);
  }

      return (
        <div className="">
          <div className="flex flex-col p-3">
            {!survey.Questions || !survey.Questions[q] ? (
              <div>
                <h1 className="p-2 text-center text-4xl">Select Template</h1>
                {templates.map((template) => (
                  <div className="flex justify-center" key={template.id}>
                    <Link to={"/TemplateOptions/" + Sid + "/" + template.id}>
                      <div className="m-4 p-6 rounded-lg border-gray-900 hover:border-blue-600 border">
                        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{template.TemplateName}</h5>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h1 className="p-2 text-center text-4xl">{templates[survey.Questions[q].TemplateId].TemplateName}</h1>
                <div className="flex flex-col p-3 justify-center">
                  {Object.keys(survey.Questions[q].Options || {}).map((key) => (
                    <button key={key} onClick={() => handleToggleChange(key, q)}>
                      <div className={"m-4 p-6 rounded-lg border-[#170699] border " + (survey.Questions[q].Options[key] === true ? 'bg-[#170699] border-white' : 'bg-white')}>
                        <h5 className={"text-center mb-2 text-2xl font-bold tracking-tight " + (survey.Questions[q].Options[key] === true ? 'text-white' : 'text-[#170699]')}>{key}: {survey.Questions[q].Options[key].toString()}</h5>
                      </div>
                    </button>
                  ))}
                  {Object.keys(survey.Questions[q].Buttons || {}).map((key) => (
                    <Link key={key} to={"/" + key + "/" + Sid + "/"}>
                      <h5 className="m-4 p-6 sm:w-fit md:w-full font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">{key}</h5>
                    </Link>
                  ))}
                  <Link to={"/TemplatePage/" + Sid +"/"+ (q+1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Edit</Link>
                </div>
              </div>
            )}
          </div>
      
          <div className="flex flex-row justify-center">
            <button onClick={Back} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
            <div className="py-3 m-3">
              <p>{q + 1}/{survey.Questions ? survey.Questions.length : 0}</p>
            </div>
            <button onClick={Next} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 <= (survey.Questions?.length ?? 0) ? '' : 'hidden'}`}>Next</button>
            <button onClick={() => Finish()} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 > (survey.Questions?.length ?? 0) ? '' : 'hidden'}`}>Finish</button>
          </div>
        </div>
      );
  }
  export default Groups;
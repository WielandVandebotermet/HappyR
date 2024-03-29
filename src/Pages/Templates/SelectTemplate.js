import { Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import TemplateApi from "../../API/TemplateApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";

function Groups() {
  const { Sid } = useParams();
  const [q, setQ] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [survey, setSurvey] = useState([]);
  const navigate = useNavigate();

  const getTemplates = async () => {
    try {
      const result = await TemplateApi.getAllTemplates();
      setTemplates(result);
      console.log("template: ", result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const getSurvey = async () => {
    try {
      const data = await SurveyQuestionApi.getSurveyById(Sid);
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

  useEffect(() => {
    console.log("q: ", q)
  }, [q]);

  if (!survey || !survey.questions) {
    console.log("Rendering loading message...");
    return (<p>Loading...</p>);
  }

  console.log("survey:", survey);
  console.log("survey.questions:", survey.questions);
  console.log("survey.questions[q]:", survey.questions[q]);

      return (
        <div className="">
          <div className="flex flex-col p-3">
            {!survey.questions[q] ? (
              <div>
                <h1 className="p-2 text-center text-4xl">Select Template</h1>
                {templates.map((template) => (
                  <div className="flex justify-center" key={template.id}>
                    <Link to={"/TemplateOptions/" + Sid + "/" + (q+1)+"/"+ template.id}>
                      <div className="m-4 p-6 rounded-lg border-gray-900 hover:border-blue-600 border">
                        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{template.templateName}</h5>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex flex-col p-3 justify-center">
                {survey.questions[q].options.map((option) => (
                  <button key={option.id} onClick={() => handleToggleChange(option.id)}>
                    <div className={"m-4 p-6 rounded-lg border-[#170699] border " + (option.settingValue === true ? 'bg-[#170699] border-white' : 'bg-white')}>
                        <h5 className={"text-center mb-2 text-2xl font-bold tracking-tight " + (option.settingValue === true ? 'text-white' : 'text-[#170699]')}>{option.setting}: {option.settingValue.toString()}</h5>
                      </div>
                  </button>
                ))}
                <Link to={"/TemplatePage/" + Sid +"/"+ (q+1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Edit</Link>
                </div>
              </div>
            )}
          </div>
      
          <div className="flex flex-row justify-center">
            <button onClick={Back} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
            <div className="py-3 m-3">
              <p>{q + 1}/{survey.questions ? survey.questions.length : 0}</p>
            </div>
            <button onClick={Next} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 <= (survey.questions?.length ?? 0) ? '' : 'hidden'}`}>Next</button>
            <button onClick={() => Finish()} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 > (survey.questions?.length ?? 0) ? '' : 'hidden'}`}>Finish</button>
          </div>
        </div>
      );
  }
  export default Groups;
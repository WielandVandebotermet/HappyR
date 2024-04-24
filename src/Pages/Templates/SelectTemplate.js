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


  if (!survey || !survey.questions) {
    return (<p>Loading...</p>);
  }

      return (
        <div className="text-StrongBlue">
          <div className="flex flex-col p-3">
            {!survey.questions[q] ? (
              <div>
                <h1 className="p-2 text-center text-4xl">Select Template</h1>
                {templates.map((template) => (
                  <div className="flex justify-center" key={"template" + template.id}>
                    <Link to={"/TemplateOptions/" + Sid + "/" + 0 +"/"+ template.id}>
                      <div className="m-4 p-6 rounded-lg hover:border-MineralGreen01 hover:text-MineralGreen border">
                        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{template.templateName}</h5>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex flex-col p-3 justify-center text-StrongBlue">
                <h1 className="flex justify-center text-3xl p-3">{survey.questions[q].question}</h1>
                {survey.questions[q].options.map((option) => (
                  <div key={"option" + option.id} className={"m-4 p-6 rounded-lg border-StrongBlue border " + (option.settingValue === true ? 'bg-StrongBlue border-white' : 'bg-white')}>
                    <h5 className={"text-center mb-2 text-2xl font-bold tracking-tight " + (option.settingValue === true ? 'text-white' : 'text-StrongBlue')}>{option.setting}: {option.settingValue.toString()}</h5>
                  </div>
                ))}
                <Link to={"/TemplateOptions/" + Sid +"/"+ survey.questions[q].id + "/" + survey.questions[q].templateId} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-StrongBlue hover:bg-StrongBlueHover focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Edit</Link>
                </div>
              </div>
            )}
          </div>
      
          <div className="flex flex-row justify-center">
            <button onClick={Back} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
            <div className="py-3 m-3">
              <p>{q + 1}/{survey.questions ? survey.questions.length : 0}</p>
            </div>
            <button onClick={Next} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 <= (survey.questions?.length ?? 0) ? '' : 'hidden'}`}>Next</button>
            <button onClick={() => Finish()} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 > (survey.questions?.length ?? 0) ? '' : 'hidden'}`}>Finish</button>
          </div>
        </div>
      );
  }
  export default Groups;
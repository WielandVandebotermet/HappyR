import { Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import TemplateApi from "../../API/TemplateApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";

function GroupOverview() {
    const { Sid, Qid, Tid } = useParams();
    const [question, setQuestion] = useState({});
    const navigate = useNavigate();

    const getTemplate = async () => {
      try {
        const result = await TemplateApi.getTemplateById(Tid);
        setQuestion(result);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }

    const getQuestion = async () => {
      try {
        const result = await SurveyQuestionApi.getSurveyById(Sid);
        setQuestion(result.questions[Qid-1]);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }
  
    useEffect(() => {
      if(Tid){
      getTemplate()
      } else {
      getQuestion()
      }
    }, []);


    const handleToggleChange = (optionId) => {
      setQuestion((prevQuestion) => {
        const updatedOptions = prevQuestion.options.map(option => {
          if (option.id === optionId) {
            return {
              ...option,
              settingValue: !option.settingValue
            };
          }
          return option;
        });
        
        return {
          ...prevQuestion,
          options: updatedOptions
        };
      });
    };

    const SaveOptions = async () => {
      try {
        await SurveyQuestionApi.createSurveyQuestion();
      } catch (error) {
        console.error('Error adding group:', error.message);
      }
    };

    const EditOptions = async () => {
      try {
        await SurveyQuestionApi.editSurveyQuestion();
      } catch (error) {
        console.error('Error adding group:', error.message);
      }
    };

    if (!question.options) {
      return (<p>Loading...</p>);
    }

      return (
          <div className="">
            <div className="flex flex-col p-3 justify-center">
            <h1 className="p-2 text-center text-4xl">{question.templateName || question.Question}</h1>
              <div className="flex flex-col p-3 justify-center">
                <div className="flex  flex-col justify-center">
                  {question.options.map((option) => (
                        <button key={option.id} onClick={() => handleToggleChange(option.id)}>
                        <div className={"m-4 p-6 rounded-lg border-[#170699] border " + (option.settingValue === true ? 'bg-[#170699] border-white' : 'bg-white')}>
                          <h5 className={"text-center mb-2 text-2xl font-bold tracking-tight " + (option.settingValue === true ? 'text-white' : 'text-[#170699]')}>{option.setting}: {option.settingValue.toString()}</h5>
                        </div>
                      </button>
                    ))}
                </div>   
              </div>
            </div>
  
            <div className="flex flex-row justify-center">  
                <button onClick={() => navigate(-1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
                <button onClick={() => navigate("/TemplatePage/" + Sid + "/" + Qid +"/"+ Tid)} type="button" className={"py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center " + (Tid ? "inline-block" : "hidden")}>Create</button>
                <button onClick={() => navigate("/TemplatePage/" + Sid + "/" + Qid +"/"+ Tid)} type="button" className={"py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center " + (Tid ? "hidden" : "inline-block")}>Edit</button>
            </div>
        </div>
      );
    }
    export default GroupOverview;
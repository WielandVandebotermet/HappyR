import { useState, useEffect, lazy, Suspense } from "react";
import Cookies from 'js-cookie';
import { useParams, useNavigate } from "react-router-dom";
import SurveyApi from "../../API/SurveyApi.js";
import ResultApi from "../../API/ResultApi.js";
import TemplateLoader from "../../components/Templates/TemplateLoader.js";

function Test() {
  const { Sid } = useParams();
  const { Gid } = useParams();
  const [UserId, setuserId] = useState(Cookies.get("UserId") || 0);
  const [q, setQ] = useState(0);
  const [survey, setSurvey] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState({});
  const navigate = useNavigate();

  const getSurvey = async () => {
    try {
      const response = await SurveyApi.getSurveyById(Sid);
      setSurvey(response);
      setQuestions(response.questions)
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
    }
  }

   const HandleResult = (Qid, answer) => {
    setResults(prevResults => ({
      ...prevResults,
      [q]: answer
    }));
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
  
  const Finish = async () => {
    let TotalResult = 0
    for (const key in results) {
      TotalResult += results[key].score;
    }
    const scoreArray = Object.values(results);
    try {
      await ResultApi.createResult(survey.id, UserId, TotalResult, scoreArray, Gid);
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
    }
    navigate(-1);
  };

  useEffect(() => {
    getSurvey();
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

  if (!questions || !survey) {
    return <div>Loading...</div>;
  }

    return (
      <div className="flex flex-col p-3 text-StrongBlue">
        <h1 className="p-2 text-center text-4xl">{survey.testName}</h1>
        <div className="">
          {questions.map((question, index) => (
            <div key={question.id} className={"flex justify-center " + (index == q ? 'inline-block' : 'hidden')}>
              <TemplateLoader templateId={question.templateId} question={question} HandleResult={HandleResult} q={q} />
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center">
            <button onClick={Back} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
            <div className="py-3 m-3">
              <p>{q + 1}/{survey.questions ? survey.questions.length : 0}</p>
            </div>
            <button onClick={Next} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 < (survey.questions?.length ?? 0) ? '' : 'hidden'}`}>Next</button>
            <button onClick={Finish} type="button" className={`py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${ q+1 >= (survey.questions?.length ?? 0) ? '' : 'hidden'}`}>Finish</button>
          </div>
    </div>
    );
}

export default Test;

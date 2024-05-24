import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SurveyApi from "../../API/SurveyApi.js";
import ResultApi from "../../API/ResultApi.js";
import TemplateLoader from "../../components/Templates/TemplateLoader.js";

function Test() {
  // Extracting Survey ID and Group ID from URL parameters
  const { Sid } = useParams();
  const { Gid } = useParams();
  
  // State variables to store user ID, current question index, survey data, questions data, and results
  const [UserId, setuserId] = useState(localStorage.getItem('UserId') || 0);
  const [q, setQ] = useState(0);
  const [survey, setSurvey] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState({});
  
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Function to fetch survey data
  const getSurvey = async () => {
    try {
      const response = await SurveyApi.getSurveyById(Sid);
      setSurvey(response);
      setQuestions(response.questions)
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
    }
  }

  // Function to handle storing question answers in results state
  const HandleResult = (Qid, answer) => {
    setResults(prevResults => ({
      ...prevResults,
      [q]: answer
    }));
  }; 

  // Function to navigate to previous question or exit the test
  const Back = () => {
    if(q === 0) {
      navigate(-1);
    };
    if(q !== 0) {
      setQ(q-1);
    };
  };

  // Function to navigate to the next question or finish the test
  const Next = () => {
    setQ(q+1);
  };
  
  // Function to calculate and store test results
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

  // Fetch survey data on component mount
  useEffect(() => {
    getSurvey();
  }, []);

  // Render loading message if questions or survey data is not yet available
  if (!questions || !survey) {
    return <div>Loading...</div>;
  }

  // Render the Test component
  return (
    <div className="flex flex-col p-3 text-StrongBlue">
      {/* Render test name */}
      <h1 className="p-2 text-center text-4xl">{survey.testName}</h1>
      <div className="">
        {/* Map through questions and render TemplateLoader component */}
        {questions.map((question, index) => (
          <div key={question.id} className={"flex justify-center " + (index === q ? 'inline-block' : 'hidden')}>
            <TemplateLoader templateId={question.templateId} question={question} HandleResult={HandleResult} q={q} />
          </div>
        ))}
      </div>
      {/* Render navigation buttons */}
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

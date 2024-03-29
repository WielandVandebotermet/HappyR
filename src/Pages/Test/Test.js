import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import SurveyApi from "../../API/SurveyApi.js";

function Test() {
  const { Sid } = useParams();
  const [UserId, setuserId] = useState(Cookies.get("UserId") || 0);
  const [survey, setSurvey] = useState([]);
  const [questions, setQuestions] = useState({});
  const [results, setResults] = useState({});


  const getSurvey = async () => {
    try {
      const response = await SurveyApi.getSurveyById(Sid);
      setSurvey(response);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  }

  useEffect(() => {
    getSurvey();
  }, []);
    
  
    return (
      <div className="flex flex-col p-3 ">
        <p>You're cookie ID is UserId: {UserId}</p>
        <input className="border border-gray-900 rounded p-1 m-1" type="number" value={UserId} onChange={(e) => setuserId(e.target.value)}></input>
        <button type="button" className="float-left inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          onClick={SetCookie()}>SetCookie</button>
    </div>
    );
  };
  export default Test;
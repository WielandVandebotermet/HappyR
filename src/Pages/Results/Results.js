import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import Back from "../../components/Navigation/Back"
import Cookies from 'js-cookie';
import ResultMap from "../../components/renderMaps/ResultMap";
function Results() {
  const [surveys, setSurveys] = useState([]);
  const [groups, setGroups] = useState([]);
  const [UserId, setuserId] = useState(Cookies.get("UserId") || 0);
 

  const getResults = async () => {
    try {
      const response = await SurveyApi.getSurveysResultsByManagerId(UserId);
      if (Array.isArray(response)) {
        setSurveys(response);
      } else {
        setSurveys([]); // Set groups to an empty array
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getAllTeams();
      setGroups(response);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  }; 

  useEffect(() => {
    getResults();
    fetchGroups();
  }, []);

  if (!surveys || !groups) {
    return <div>Loading...</div>;
  }

    return (
      <div className="min-h-screen">
        <div className="flex flex-col p-3 text-StrongBlue">
            <h1 className="p-2 text-center text-4xl">Results</h1>
            <div className="flex flex-col p-3 justify-center">
              {surveys.map((survey, index) => (
                <ResultMap key={index} survey={survey} groups={groups} url={"/ResultOverview/" + survey.id} />
              ))}
          <Back />
          </div>
        </div>
  </div>
    );
  }
  export default Results;
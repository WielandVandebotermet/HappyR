import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import Back from "../../components/Back"
import SurveyMap from '../../components/renderMaps/SurveyMap.js';

function CreateSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [groups, setGroups] = useState([]);

  const getSurveys = async () => {
    try {
      const response = await SurveyApi.getAllSurveys();
      const activeSUrveys = response.filter(survey => survey.started === false);

      setSurveys(activeSUrveys);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
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
    getSurveys();
    fetchGroups();
  }, []);

  if (!groups && !surveys) {
    return <div>Loading...</div>;
  }

    return (
      <div className="">
        <div className="flex flex-col p-3">
            <h1 className="p-2 text-center text-4xl">Inactive Surveys</h1>
            <div className="flex flex-col p-3 justify-center">
            {surveys.map((survey, index) => (
              <SurveyMap key={index} survey={survey} groups={groups} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <Link to={"/CreateSurvey/0"}>
          <div className="flex justify-center">
            <button type="button" className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center">Create new Survey</button>
          </div>
        </Link>
        <Back />
      </div>
    </div>
    );
  }
  export default CreateSurveys;
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import Back from "../../components/Navigation/Back"
import SurveyMap from '../../components/renderMaps/ManageSurveyMap.js';

function CreateSurveys() {
  // State variables to store surveys, groups, and user ID
  const [surveys, setSurveys] = useState([]);
  const [groups, setGroups] = useState([]);
  const [UserId, setuserId] = useState(localStorage.getItem('UserId') || 0);

  // Function to fetch surveys by manager ID
  const getSurveys = async () => {
    try {
      const response = await SurveyApi.getSurveysByManagerId(UserId);
      setSurveys(response);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  }

  // Function to fetch all groups
  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getAllTeams();
      setGroups(response);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  };

  // Fetch surveys and groups on component mount
  useEffect(() => {
    getSurveys();
    fetchGroups();
  }, []);

  // Render loading message if groups or surveys are not yet available
  if (!groups && !surveys) {
    return <div>Loading...</div>;
  }

  // Render the CreateSurveys component
  return (
    <div className="text-StrongBlue">
      <div className="flex flex-col p-3">
        {/* Render Manage Surveys title */}
        <h1 className="p-2 text-center text-4xl">Manage Surveys</h1>
        <div className="flex flex-col p-3 justify-center">
          {/* Map through surveys and render SurveyMap component */}
          {surveys.map((survey, index) => (
            <SurveyMap key={index} survey={survey} groups={groups} url={"/CreateSurvey/"+ survey.id}/>
          ))}
        </div>
      </div>
      {/* Render Create new Survey button and Back button */}
      <div className="flex flex-col">
        <Link to={"/CreateSurvey/0"}>
          <div className="flex justify-center">
            <button type="button" className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center">Create new Survey</button>
          </div>
        </Link>
        <Back />
      </div>
    </div>
  );
}

export default CreateSurveys;

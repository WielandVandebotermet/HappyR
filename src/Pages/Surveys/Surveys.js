import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Back from "../../components/Navigation/Back"
import SurveyApi from "../../API/SurveyApi.js";
import SurveyMap from '../../components/renderMaps/SurveyMap.js';
import GroupApi from "../../API/GroupApi";

function Surveys() {
  // State variables to store surveys, groups, user ID, and user groups
  const [surveys, setSurveys] = useState([]);
  const [groups, setGroups] = useState([]);
  const [UserId, setuserId] = useState(localStorage.getItem('UserId') || 0);
  const [userGroups, setUserGroups] = useState();

  // Function to fetch surveys by user ID
  const getSurveys = async () => {
    try {
      const response = await SurveyApi.getSurveysByManagerId(UserId);
      // Filter active surveys
      const activeSurveys = response.filter(survey => survey.started == true);
      setSurveys(activeSurveys);
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

  // Function to fetch user groups by user ID
  const fetchUserGroups = async () => {
    try {
      const response = await GroupApi.getTeamsByUserId(UserId);
      setUserGroups(response);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  };

  // Fetch all groups and user groups on component mount
  useEffect(() => {
    fetchGroups();
    fetchUserGroups();
  }, []);

  // Fetch surveys when user ID changes
  useEffect(() => {
    if (UserId !== 0) {
      getSurveys();
    }
  }, [UserId]);

  // Render loading message if groups or surveys are not yet available
  if (!groups || !surveys) {
    return <div>Loading...</div>;
  }

  // Render the Surveys component
  return (
    <div className="text-StrongBlue">
      <div className="flex flex-col p-3">
        {/* Render Surveys title */}
        <h1 className="p-2 text-center text-4xl">Surveys</h1>
        <div className="flex flex-col p-3 justify-center">
          {/* Map through surveys and render SurveyMap component */}
          {surveys.map((survey, index) => (
            <SurveyMap key={index} survey={survey} groups={groups} userGroups={userGroups} url={"/Test/"+ survey.id + "/"} />
          ))}
        </div>
      </div>
      {/* Render Create Survey button and Back button */}
      <div className="flex flex-col">
        <Link to="/NewSurveys">
          <div className="flex justify-center">
            <button type="button" className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center">Create Survey</button>
          </div>
        </Link>
        <Back />
      </div>
    </div>
  );
}

export default Surveys;

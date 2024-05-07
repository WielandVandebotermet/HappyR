import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Back from "../../components/Navigation/Back"
import SurveyApi from "../../API/SurveyApi.js";
import SurveyMap from '../../components/renderMaps/SurveyMap.js';
import GroupApi from "../../API/GroupApi";

function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [groups, setGroups] = useState([]);
  const [UserId, setuserId] = useState(Cookies.get("UserId") || 0);
  const [GroupId, setGroupId] = useState();
  const [userGroups, setUserGroups] = useState();



  const getSurveys = async () => {
    try {
      const response = await SurveyApi.getSurveysByUserId(UserId);
      const activeSurveys = response.filter(survey => survey.started == true);
      setSurveys(activeSurveys);
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

  const fetchUserGroups = async () => {
    try {
      const response = await GroupApi.getTeamsByUserId(UserId);
      setUserGroups(response);
      console.log('HUG',response);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchUserGroups();
  }, []);

  useEffect(() => {
    if (UserId != 0) {
      getSurveys();
    }
  }, [UserId]);

  if (!groups || !surveys) {
    return <div>Loading...</div>;
  }

    return (
      <div className="text-StrongBlue">
        <div className="flex flex-col p-3">
            <h1 className="p-2 text-center text-4xl">Surveys</h1>
            <div className="flex flex-col p-3 justify-center">
            {surveys.map((survey, index) => (
              <SurveyMap key={index} survey={survey} groups={groups} userGroups={userGroups} url={"/Test/"+ survey.id + "/"} />
            ))}
          </div>
        </div>

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
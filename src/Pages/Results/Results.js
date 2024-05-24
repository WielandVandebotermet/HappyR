import { useState, useEffect } from "react";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import Back from "../../components/Navigation/Back";
import ResultMap from "../../components/renderMaps/ResultMap";

function Results() {
  // State variables to store survey data and group data
  const [surveys, setSurveys] = useState([]);
  const [groups, setGroups] = useState([]);
  const [UserId, setuserId] = useState(localStorage.getItem('UserId') || 0);

  // Function to fetch survey results by manager ID
  const getResults = async () => {
    try {
      const response = await SurveyApi.getSurveysResultsByManagerId(UserId);
      if (Array.isArray(response)) {
        setSurveys(response);
      } else {
        setSurveys([]); // Set surveys to an empty array if response is not an array
      }
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };

  // Function to fetch all groups
  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getAllTeams();
      setGroups(response);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  // Fetch survey results and groups on component mount
  useEffect(() => {
    getResults();
    fetchGroups();
  }, []);

  // Render loading screen if survey or group data is not yet available
  if (!surveys || !groups) {
    return <div>Loading...</div>;
  }

  console.log(surveys)

  // Render the Results component
  return (
    <div className="min-h-screen">
      <div className="flex flex-col p-3 text-StrongBlue">
        <h1 className="p-2 text-center text-4xl">Results</h1>
        <div className="flex flex-col p-3 justify-center">
          {/* Map through surveys and render ResultMap component for each */}
          {surveys.map((survey, index) => (
            <ResultMap
              key={index}
              survey={survey}
              groups={groups}
              url={"/ResultOverview/" + survey.id}
            />
          ))}
          {/* Render back button */}
          <Back />
        </div>
      </div>
    </div>
  );
}

export default Results;

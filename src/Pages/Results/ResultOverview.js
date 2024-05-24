import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import ResultGroupAccordion from "../../components/Results/ResultGroupAccordion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ResultOverview() {
  // Retrieve survey ID from URL parameters
  const { Sid } = useParams();

  // State variables to store survey data, group data, and active elements
  const [survey, setSurvey] = useState(null);
  const [groups, setGroups] = useState(null);
  const [activeElement, setActiveElement] = useState("element");
  const [activeGroup, setActiveGroup] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  // Function to fetch survey data by ID
  const getResults = async () => {
    try {
      const response = await SurveyApi.getSurveyById(Sid);
      setSurvey(response);
      const startDate = new Date(response.startDate);
      const month = startDate.toLocaleDateString("en-GB", { month: "long" });
      const day = startDate.getDate();
      setDate(month + " " + day);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  // Function to fetch groups associated with the survey
  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getTeamsBySurveyId(Sid);
      setGroups(response);
      if (response.length > 0) {
        setActiveGroup(response[0].id);
      }
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  // Fetch survey data and groups on component mount or when survey ID changes
  useEffect(() => {
    getResults();
    fetchGroups();
  }, [Sid]);

  // Function to handle click events on elements
  const HandleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  // Function to toggle active group
  const handleGroupToggle = (groupId) => {
    if (groupId !== activeGroup) {
      setActiveGroup(groupId);
    }
  };

  // Function to toggle active user
  const handleUserToggle = (userId) => {
    setActiveUser((prevActiveUser) => {
      return prevActiveUser === userId ? "" : userId;
    });
  };

  // Function to determine if the viewport is in landscape orientation
  function Landscape() {
    const isLandscape = window.innerWidth > window.innerHeight;
    return isLandscape;
  }

  // Render loading screen if survey or groups data is not yet available
  if (!survey || !groups) {
    return <div>Loading...</div>;
  }

  // Render the result overview page
  return (
    <div className="max-h-full flex flex-col text-StrongBlue">
      <div className="flex-grow flex flex-col overflow-y-auto">
        <div className="flex flex-row items-center justify-between p-2 m-2">
          <div className="flex items-center">
            {/* Link to navigate back to the previous page */}
            <Link onClick={() => navigate(-1)} className="w-a h-auto hover:text-MineralGreen">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" size="3x"/>
            </Link>
          </div>
          {/* Display survey date and name */}
          <h1 className="p-2 text-center text-4xl flex-grow">
            {date} | {survey.testName}
          </h1>
        </div>
        <div className="overflow-y-auto">
          <div className="flex flex-wrap  justify-center">
            {/* Render group names as buttons for selection */}
            {groups.map((group) => (
              <h5
                key={group.id}
                className="p-3 mb-2 text-xl font-medium leading-tight"
              >
                <button
                  className={
                    activeGroup === group.id
                      ? "underline text-MineralGreen"
                      : "no-underline text-AccentRed"
                  }
                  onClick={() => handleGroupToggle(group.id)}
                >
                  {group.groupName}
                </button>
              </h5>
            ))}
            {/*
              <h5 className="p-3 mb-2 text-xl font-medium leading-tight">
                <button
                  className={
                    activeGroup === "Total"
                      ? "underline text-MineralGreen"
                      : "no-underline text-AccentRed"
                  }
                  onClick={() => handleGroupToggle("Total")}
                >
                  Total
                </button>
              </h5>
            */}
          </div>
          {/* Render result groups accordion */}
          <div className={" " + (Landscape() === false ? " p-0 " : " p-9 ")}>
            {groups.map((group) => (
              <div key={group.id}>
                {activeGroup === group.id && (
                  <ResultGroupAccordion
                    survey={survey}
                    groupId={group.id}
                    groups={groups}
                    activeUser={activeUser}
                    handleUserToggle={handleUserToggle}
                  />
                )}
              </div>
            ))}
            {/* 
              <div key={"Total"}>{activeGroup === "Total" && <p>Test</p>}</div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultOverview;

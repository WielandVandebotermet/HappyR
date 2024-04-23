import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import ResultGroupAccordion from "../../components/Results/ResultGroupAccordion";
import { TECollapse } from "tw-elements-react";
import Back from "../../components/Navigation/Back";

function ResultOverview() {
  const { Sid } = useParams();
  const [survey, setSurvey] = useState(null);
  const [groups, setGroups] = useState(null);
  const [activeElement, setActiveElement] = useState("element");
  const [activeGroup, setActiveGroup] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

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

  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getTeamsBySurveyId(Sid);
      setGroups(response);
      if (response.length > 0) {
        setActiveGroup(response[0].id);
      }

      console.log("groups", response);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  useEffect(() => {
    getResults();
    fetchGroups();
  }, [Sid]);

  useEffect(() => {
    console.log("activeUser:", activeUser); // Check if activeUser changes
  }, [activeUser]);

  const HandleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  const handleGroupToggle = (groupId) => {
    if (groupId !== activeGroup) {
      setActiveGroup(groupId);
    }
  };

  const handleUserToggle = (userId) => {
    setActiveUser((prevActiveUser) => {
      return prevActiveUser === userId ? "" : userId;
    });
  };

  function Landscape() {
    const isLandscape = window.innerWidth > window.innerHeight;
    return isLandscape;
  }
  
  if (!survey || !groups) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-h-full flex flex-col">
      <div className="flex-grow flex flex-col overflow-y-auto">
        <h1 className="p-2 text-center text-4xl">
          {date} | {survey.testName}
          <Link onClick={() => navigate(-1)} className="w-1/2">
            <button
              type="button"
              className="p-2 ml-3 text-white bg-[#170699] hover:text-[#AB1AAB] hover:underline rounded-lg text-center"
            >
              Back
            </button>
          </Link>
        </h1>
        <div className="overflow-y-auto">
          <div className="flex flex-wrap  justify-center">
            {groups.map((group) => (
              <h5
                key={group.id}
                className="p-3 mb-2 text-xl font-medium leading-tight"
              >
                <button
                  className={
                    activeGroup === group.id ? "underline" : "no-underline"
                  }
                  onClick={() => handleGroupToggle(group.id)}
                >
                  {group.groupName}
                </button>
              </h5>
            ))}
            <h5 className="p-3 mb-2 text-xl font-medium leading-tight">
              <button
                className={
                  activeGroup === "Total" ? "underline" : "no-underline"
                }
                onClick={() => handleGroupToggle("Total")}
              >
                Total
              </button>
            </h5>
          </div>
          <div className={" " + (Landscape() == false ? " p-0 " : " p-9 ")}>
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
            <div key={"Total"}>
              {activeGroup === "Total" && <p>Test</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultOverview;

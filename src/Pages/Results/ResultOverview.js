import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import ResultGroupAccordion from "../../components/ResultGroupAccordion";
import { TECollapse } from "tw-elements-react";

function ResultOverview() {
  const { Sid } = useParams();
  const [survey, setSurvey] = useState(null);
  const [groups, setGroups] = useState(null);
  const [activeElement, setActiveElement] = useState("element");
  const [date, setDate] = useState(null);

  const getResults = async () => {
    try {
      const response = await SurveyApi.getSurveyById(Sid);
      setSurvey(response);
      const startDate = new Date(response.startDate);
      const month = startDate.toLocaleDateString('en-GB', { month: 'long' });
      const day = startDate.getDate();
      setDate(month +" "+ day)
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getAllTeams();
      setGroups(response);
      console.log("groups", response);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };
  useEffect(() => {
    getResults();
    fetchGroups();
    console.log("Test");
  }, [Sid]);

  const HandleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  if (!survey || !groups) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-3">
      <h1 className="p-2 text-center text-4xl">{date} | {survey.testName}</h1>
      <div className="flex flex-col p-3 justify-center">
        {survey.groupList.map((groupId, index) => (
          <div
            key={"ResultGroup:" + groupId + " Group:" + groupId}
            className="flow-root"
          >
            <ResultGroupAccordion groupId={groupId} groups={groups} />
          </div>
        ))}
        <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
          <h2 className="mb-0" id="headingOne">
            <button
              className={`${
                activeElement === "element" &&
                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
              } group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
              type="button"
              onClick={() => HandleClick("element")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Total
              <span
                className={`${
                  activeElement === "element"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 fill-[#212529] dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4">TEST</div>
          </TECollapse>
        </div>
      </div>
    </div>
  );
}
export default ResultOverview;

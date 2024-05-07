import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TECollapse } from "tw-elements-react";
import ResultUserAccordion from "./ResultUserAccordion";
import ResultApi from "../../API/ResultApi";
import Results from "../../Pages/Results/Results";
import ResultLoader from "./TotalResultGroup";
import Cookies from 'js-cookie';

const ResultGroupAccordion = ({
  survey,
  groupId,
  groups,
  activeUser,
  handleUserToggle,
}) => {
  const { Sid } = useParams();
  const [title, setTitle] = useState(
    groups.find((group) => group.id === groupId)?.groupName
  );
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      let response = await ResultApi.getResultBySurveyId(Sid);
      console.log(response)
      if (response) {
        response = response.filter(result => result.groupId == groupId)
        console.log(results);
      }

      setResults(response);
    } catch (error) {
      console.error("Error fetching results:", error.message);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (results.length === 0) {
    return <div>No Results for this group: {title}, Come back when people have done the survey</div>;
  }

  return (
        <div className="px-5 py-4">
          <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
            <h2 className="mb-0" id="total">
              <button
                className={`${
                  activeUser === "Result" + groupId &&
                  `text-MineralGreen [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                } group relative text-AccentRed flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                type="button"
                onClick={() => handleUserToggle("Result" + groupId)}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Total
                <span
                  className={`${
                    activeUser === "Result" + groupId
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
            <div
              className={"!mt-0 !rounded-b-none !shadow-none " + (activeUser === "Result" + groupId ? "inline" : "hidden")}
            >
              <div className="px-5 py-4">
                <ResultLoader result={results} />
              </div>
            </div>
          </div>
          {results.map((result, index) => (
            <div
              key={"ResultGroup:" + groupId + " ResultUser:" + result.userId}
              className="flow-root"
            >
              <ResultUserAccordion
                survey={survey}
                result={result}
                UserId={result.userId}
                activeElement={activeUser}
                handleUserToggle={handleUserToggle}
              />
            </div>
          ))}
        </div>
  );
};

export default ResultGroupAccordion;

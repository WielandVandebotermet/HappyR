import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TECollapse } from "tw-elements-react";
import ResultUserAccordion from "./ResultUserAccordion";
import ResultApi from "../API/ResultApi";
import Results from "../Pages/Results/Results";

const ResultGroupAccordion = ({ groupId, groups }) => {
  const { Sid } = useParams();
  const [title, setTitle] = useState(
    groups.find((group) => group.id === groupId)?.groupName
  );
  const [activeElementGroup, setActiveElementGroup] = useState("");
  const [results, setResults] = useState(null);

  const fetchResults = async () => {
    try {
      let response = await ResultApi.getResultBySurveyId(Sid);

      if (response) {
        response = [response];
      }

      setResults(response);
    } catch (error) {
      console.error("Error fetching results:", error.message);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleClick = (value) => {
    if (value === activeElementGroup) {
      setActiveElementGroup("");
    } else {
      setActiveElementGroup(value);
    }
  };

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
      <h2 className="mb-0" id="headingOne">
        <button
          className={`${
            activeElementGroup === "element" + groupId &&
            `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
          } group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
          type="button"
          onClick={() => handleClick("element" + groupId)}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          {title}
          <span
            className={`${
              activeElementGroup === "element" + groupId
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
        show={activeElementGroup === "element" + groupId}
        className="!mt-0 !rounded-b-none !shadow-none"
      >
        <div className="px-5 py-4">
          {results.map((result, index) => (
            <div
              key={"ResultGroup:" + groupId + " ResultUser:" + result.userId}
              className="flow-root"
            >
              <ResultUserAccordion UserId={result.userId} />
            </div>
          ))}
        </div>
      </TECollapse>
    </div>
  );
};

export default ResultGroupAccordion;

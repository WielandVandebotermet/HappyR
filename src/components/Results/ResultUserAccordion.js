// Import necessary modules
import { useEffect, useState } from "react";
import UserApi from "../../API/UserApi";
import { TETooltip } from "tw-elements-react";
import ResultLoader from "./Questions/ResultLoader";

// Define ResultUserAccordion component
const ResultUserAccordion = ({
  survey,
  result,
  UserId,
  activeElement,
  handleUserToggle,
  activeUser,
}) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState(result.scoreList);
  const [activeElementUser, setActiveElementUser] = useState("");
  const [user, setUser] = useState([]);

  // Fetch user details based on UserId
  const GetUser = async () => {
    try {
      const response = await UserApi.getUserById(UserId);
      setUser(response);
      setTitle(response.firstName + " " + response.lastName);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  // Trigger GetUser on component mount or when UserId changes
  useEffect(() => {
    GetUser();
  }, [UserId]);

  // Update activeElementUser when activeElement changes
  useEffect(() => {
    setActiveElementUser(activeElement);
  }, [activeElement]);

  // Handle user toggle click event
  const handleClick = () => {
    handleUserToggle(UserId);
  };

  // Display loading message if user data is not yet available
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-none border border-l-0 border-r-0 border-t-0  border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
      {/* Accordion Header */}
      <h2 className="mb-0" id="headingOne">
        <button
          className={`${
            activeElement === UserId &&
            `text-MineralGreen [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
          } group relative text-AccentRed flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
          type="button"
          onClick={() => handleUserToggle(UserId)}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          {title}
          <span
            className={`${
              activeElement === UserId
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

      {/* Accordion Content */}
      <div
        className={
          "!mt-0 !rounded-b-none !shadow-none " +
          (activeElement === UserId ? "inline" : "hidden")
        }
      >
        <div className="px-5 pb-6">
          {survey.questions.map((question, index) => (
            <div key={question.id} className="h-full m-2 p-2">
              <ResultLoader
                templateId={question.templateId}
                question={question}
                answer={result.scoreList[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export ResultUserAccordion component
export default ResultUserAccordion;
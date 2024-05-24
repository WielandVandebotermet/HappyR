import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";

// Component to display a survey and handle group selection
function SurveyMap({ survey, groups, url, userGroups }) {
  const [modal, setModal] = useState(false); // State to control the modal visibility
  const [filteredGroups, setFilteredGroups] = useState([]); // State to store filtered groups
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Extracting start date from the survey object
  const startDate = new Date(survey.startDate);
  const month = startDate.toLocaleDateString("en-GB", { month: "long" });
  const day = startDate.getDate();
  const formattedDate = `${month} ${day}`;

  // Finding the group associated with the survey
  const group = groups.find((group) => group.id === survey.groupList[0]);

  // Function to handle group selection
  const setGroup = () => {
    if (survey.groupList && survey.groupList.length > 1) {
      // If multiple groups are available, filter user groups
      const filtered = userGroups.filter((group) =>
        survey.groupList.includes(group.id)
      );
      setFilteredGroups(filtered);
      setModal(true); // Open the modal to select a group
    } else if (survey.groupList && survey.groupList.length === 1) {
      // If only one group is available, navigate directly to it
      navigate(url + survey.groupList[0]);
    }
  };

  // If group data is not available, display loading message
  if (!group || !group.groupName) {
    return <div>Loading...</div>;
  }

  // Rendering the survey component
  return (
    <div>
      <div className="flex justify-center">
        <button onClick={setGroup} className="hover:text-MineralGreen text-StrongBlue">
          <div
            key={survey.id}
            className="block max-w-sm m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border"
          >
            <div className="">
              <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {formattedDate} | {survey.testName}
              </h5>
            </div>
            <p className="text-right text-sm">{group.groupName}</p>
          </div>
        </button>
      </div>

      {/* Modal for group selection */}
      <TEModal show={modal} setShow={setModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200 text-AccentRed">
                Select group
              </h5>
              {/* Close button */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setModal(false)}
                aria-label="Close"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            <TEModalBody className="text-StrongBlue">
              {/* Render filtered groups */}
              {filteredGroups.map((group, index) => (
                <div key={group.id}>
                  <Link to={url + group.id}>
                    <div className="m-4 p-6 rounded-lg hover:text-MineralGreen border">
                      <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {group.groupName}
                      </h5>
                    </div>
                  </Link>
                </div>
              ))}
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

export default SurveyMap;

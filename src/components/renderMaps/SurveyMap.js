import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

function SurveyMap({ survey, groups, url, userGroups }) {
  const [modal, setModal] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const navigate = useNavigate();

  const startDate = new Date(survey.startDate);

  const month = startDate.toLocaleDateString("en-GB", { month: "long" });
  const day = startDate.getDate();

  const formattedDate = `${month} ${day}`;

  const group = groups.find((group) => group.id === survey.groupList[0]);

  const setGroup = () => {
    console.log("check");
    console.log(survey.groupList);
    console.log(userGroups);
    
    if (survey.groupList && survey.groupList.length > 1) {
      const filtered = userGroups.filter((group) => survey.groupList.includes(group.id));
      setFilteredGroups(filtered);
      setModal(true);
      console.log(filtered);
    } else if (survey.groupList && survey.groupList.length === 1) {
      navigate(url + survey.groupList[0]);
    }
  };
  
  if (!group.groupName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center ">
        <button onClick={setGroup}>
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

      <TEModal show={modal} setShow={setModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Select group
              </h5>
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
            <TEModalBody>
              {filteredGroups.map((group, index) => (
                <div>
                  <Link to={url + group.id}>
                    <div className="m-4 p-6 rounded-lg border-gray-900 hover:border-blue-600 border">
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

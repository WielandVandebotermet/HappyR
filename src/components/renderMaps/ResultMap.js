import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ResultApi from "../../API/ResultApi";

// Component to display survey results
function ResultMap({ survey, groups, url }) {
  const [results, setResults] = useState(); // State to store results
  const [loading, setLoading] = useState(true); // State to track loading status

  // Extracting start date from the survey object
  const startDate = new Date(survey.startDate);
  const month = startDate.toLocaleDateString("en-GB", { month: "long" });
  const day = startDate.getDate();
  const formattedDate = `${month} ${day}`;

  // Finding the group associated with the survey
  const group = groups.find((group) => group.id === survey.groupList[0]);

  // Function to fetch results from the API
  const fetchResults = async () => {
    try {
      let response = await ResultApi.getResultBySurveyId(survey.id);
      console.log(response);

      setResults(response);
    } catch (error) {
      console.error("Error fetching results:", error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Fetch results when the component mounts
  useEffect(() => {
    fetchResults();
  }, []);

  // Function to determine the number of answers
  const Answerd = (index) => {
    if (index === 0) {
      console.log(results);
      const Amount = results.length;
      return Amount + " Answerd";
    }
  };

  // If group, group name, or results are not available or if still loading, display loading message
  if (!group || !group.groupName || loading) {
    return <div>Loading...</div>;
  }

  // If there are no results, return null
  if (results.length === 0) {
    return null;
  }

  // Rendering survey results
  return (
    <div className="flex justify-center ">
      <Link to={url}>
        <div
          key={"Survey:" + survey.id}
          className="block max-w-sm m-4 p-6 rounded-lg border text-StrongBlue border-StrongBlue hover:text-MineralGreen"
        >
          <div className="">
            <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {formattedDate} | {survey.testName}
            </h5>
          </div>
          {survey.groupList.map((groupId, index) => (
            <div
              key={"Survey:" + survey.id + " Group:" + groupId}
              className="flow-root"
            >
              <p className="float-right text-sm">{Answerd(index)}</p>
              <p className="float-left text-sm">
                {groups.find((group) => group.id === groupId)?.groupName}
              </p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default ResultMap;

import { Link } from "react-router-dom";

// Component to display survey details
function SurveyMap({ survey, groups, url }) {
    // Extracting start date from the survey object
    const startDate = new Date(survey.startDate);
  
    // Formatting the start date
    const month = startDate.toLocaleDateString('en-GB', { month: 'long' });
    const day = startDate.getDate();
    const formattedDate = `${month} ${day}`;
  
    // Finding the group associated with the survey
    const group = groups.find(group => group.id === survey.groupList[0]);

    // If group or group name is not available, display loading
    if(!group || !group.groupName) {
        return <div>Loading...</div>;
    }

    // Rendering survey details
    return (
        <div className="flex justify-center ">
            <Link to={url}>
                <div key={survey.id} className="block max-w-sm m-4 p-6 rounded-lg text-StrongBlue hover:text-MineralGreen border">
                    <div className="">
                        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{formattedDate} | {survey.testName}</h5>
                    </div>
                    <p className="text-right text-sm">{group.groupName}</p>
                </div>
            </Link>
        </div>
    );
}
  
export default SurveyMap;

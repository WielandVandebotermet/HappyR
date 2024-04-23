import { Link } from "react-router-dom";

function SurveyMap({ survey, groups, url }) {
    const startDate = new Date(survey.startDate);
  
    const month = startDate.toLocaleDateString('en-GB', { month: 'long' });
    const day = startDate.getDate();
  
    const formattedDate = `${month} ${day}`;
  
    const group = groups.find(group => group.id === survey.groupList[0]);

    if(!group ||!group.groupName ){
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center ">
            <Link to={url}>
                <div key={survey.id} className="block max-w-sm m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
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
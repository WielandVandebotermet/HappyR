import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import SurveysApi from "../../API/SurveyAPI";
import Back from "../../components/Back"

function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const surveysApi = new SurveysApi();

  const getSurveys = async () => {
    try {
      const data = surveysApi.all();
      setSurveys(data);
      console.log("Results:", surveys);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    getSurveys()
  }, []);

    return (
      <div class="">
        <div class="flex flex-col p-3">
            <h1 class="p-2 text-center text-4xl">Surveys</h1>
            <div class="flex flex-col p-3 justify-center">
                {surveys.map((survey) => {
                  return (
                    <div class="flex justify-center ">
                      <Link to={"/GroupOverview/" + survey.id}>
                        <div class="block max-w-sm m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <div class="">
                            <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{survey.Date} | {survey.SurveyName}</h5>
                          </div>
                            <p class="text-right text-sm">{survey.GroupName}</p>
                        </div>
                      </Link>
                    </div>
                  )
                })}
          </div>
        </div>

        <div class="flex flex-col">
          <Link to="/NewSurveys">
          <div class="flex justify-center">
            <button type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center">Create Survey</button>
          </div>
        </Link>
        <Back />
      </div>
    </div>
    );
  }
  export default Surveys;
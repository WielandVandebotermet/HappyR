import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import ResultsApi from "../../API/ResultsAPi";

function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const resultsApi = new ResultsApi();

  const getResults = async () => {
    try {
      const data = resultsApi.all();
      setResults(data);
      console.log("Results:", results);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    getResults()
  }, []);

    return (
      <div class=" min-h-screen">
        <div class="flex flex-col p-3">
            <h1 class="p-2 text-center text-4xl">Results</h1>
            <div class="flex flex-col p-3 justify-center">
                {results.map((result) => {
                  return (
                    <div class="flex justify-center ">
                      <Link to={"/GroupOverview/" + result.id}>
                        <div class="m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{result.Date} | {result.ResultName}</h5>
                          <div class="flow-root">
                            <p class="float-right text-sm">{result.answered}</p>
                            <p class="float-left text-sm">{result.GroupName}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <Link onClick={() => navigate(-1)}>
            <div class="flex justify-center">
              <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
            </div>
          </Link>
        </div>
  </div>
    );
  }
  export default Results;
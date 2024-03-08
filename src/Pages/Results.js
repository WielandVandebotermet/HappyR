import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import ResultsApi from "../API/ResultsAPi";
import Back from "../components/Back"

function Results() {
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
      <div class="min-h-screen">
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
          <Back />
        </div>
  </div>
    );
  }
  export default Results;
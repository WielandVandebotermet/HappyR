import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import ResultsApi from "../API/ResultApi";
import Back from "../components/Navigation/Back"


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
      <div className="min-h-screen">
        <div className="flex flex-col p-3">
            <h1 className="p-2 text-center text-4xl">Results</h1>
            <div className="flex flex-col p-3 justify-center">
                {results.map((result) => {
                  return (
                    <div className="flex justify-center ">
                      <Link to={"/GroupOverview/" + result.id}>
                        <div className="m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{result.Date} | {result.ResultName}</h5>
                          <div className="flow-root">
                            <p className="float-right text-sm">{result.answered}</p>
                            <p className="float-left text-sm">{result.GroupName}</p>
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
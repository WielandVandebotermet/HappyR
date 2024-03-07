import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import NewSurveysApi from "../../../API/NewSurveysApi";
import { TESelect } from "tw-elements-react";

function CreateSurveys() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const surveysApi = new NewSurveysApi();
  const [groupName, setGroupName] = useState("");

  const getSurveys = async () => {
    try {
      const data = surveysApi.all();
      setSurveys(data);
      console.log("Results:", surveys);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const data = [
    { text: "One", value: 1 },
    { text: "Two", value: 2 },
    { text: "Three", value: 3 },
    { text: "Four", value: 4 },
    { text: "Five", value: 5 },
  ];

  useEffect(() => {
    getSurveys()
  }, []);

    return (
      <div class=" min-h-screen">
        <div class="flex flex-col p-3">
            <h1 class="p-2 text-center text-4xl">Create new survey</h1>
            <div class="flex flex-col p-3 justify-center">
              <div className="flex flex-col p-3 ">
                <input className="border border-gray-900 rounded p-1 m-1" type="text" name="Groupname" label="Enter group name here" value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
                <p className="text-right text-md">GroupName</p>
              </div>
              <div className="flex flex-col p-3 ">
                <input className="border border-gray-900 rounded p-1 m-1" type="text" name="Groupname" label="Enter group name here" value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
                <p className="text-right text-md">Date</p>
              </div>
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="checkboxDefault" />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="checkboxDefault">
                  Default checkbox
                </label>
                <div className="flex justify-center">
                  <div className="relative mb-3 md:w-96 pt-5">
                    <TESelect data={data} label="Example label" />
                  </div>
                  <div className="relative mb-3 md:w-96 pt-5">
                    <TESelect data={data} label="Example label" />
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="flex flex-col">
          <Link to="/">
          <div class="flex justify-center">
            <button type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center">Select Group(s)</button>
          </div>
        </Link>
        <Link onClick={() => navigate(-1)}>
          <div class="flex justify-center">
            <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-60 rounded-lg text-center">Back</button>
          </div>
        </Link>
      </div>
    </div>
    );
  }
  export default CreateSurveys;
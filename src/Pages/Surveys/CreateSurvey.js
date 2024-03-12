import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import NewSurveysApi from "../../API/NewSurveysApi";
import GroupApi from "../../API/GroupAPi";
import { TESelect } from "tw-elements-react";
import Back from "../../components/Back"

function CreateSurveys() {
  const { id } = useParams();
  const groupApi = new GroupApi();
  const surveysApi = new NewSurveysApi();

  const [Check, setCheck] = useState(false);
  const [GroupPage, setGroupPage] = useState(false);

  const [groups, setGroups] = useState([]);

  const [SurveyName, setSurveyName] = useState("");
  const [date, setDate] = useState(new Date());
  const [Reocurring, setReocurring] = useState({Time: 1, Multiplier: "days" });
  const [Selectedgroups, setSelectedgroups] = useState([]);

  const getSurvey = async () => {
    try {
      const data = surveysApi.getGroupById(id);
      setSurveyName(data.SurveyName);
      setSelectedgroups(data.GroupList)
      
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const getGroups = async () => {
    try {
      const result = groupApi.all();
      setGroups(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const handleToggleChange = (groupId) => {
    setSelectedgroups((prevSelectedGroups) => {
      if (prevSelectedGroups.includes(groupId)) {
        return prevSelectedGroups.filter((id) => id !== groupId);
      } else {
        return [...prevSelectedGroups, groupId];
      }
    });
  };

 
  const Number = [
    { text: "1", value: 1 },
    { text: "2", value: 2 },
    { text: "3", value: 3 },
    { text: "4", value: 3 },
    { text: "5", value: 3 },
    { text: "6", value: 3 },
    { text: "7", value: 3 },
  ];
  
  const Time = [
    { text: "Days", value: 1 },
    { text: "Weeks", value: 2 },
    { text: "Months", value: 3 },
    { text: "Years", value: 4 },
  ];

  useEffect(() => {
    getSurvey();
    getGroups();
  }, []);



    return (
      <div>
        <div className={" "+ (GroupPage ? 'hidden' : 'block')}>
          <div className="flex flex-col p-3">
            <h1 className={"p-2 text-center text-4xl " + (id !== "0" ? 'block' : 'hidden')}>{SurveyName}</h1>
            <h1 className={"p-2 text-center text-4xl " + (id === "0" ? 'block' : 'hidden')}>Create new survey</h1>
              <div className="flex justify-center">
              <div className="w-full md:w-1/3 md:flex flex-col">
                <div className="flex flex-col p-3">
                  <input className="border border-gray-900 rounded p-1 m-1" type="text" name="Groupname" label="Enter group name here" value={SurveyName} onChange={(e) => setSurveyName(e.target.value)}></input>
                  <p className="text-right text-md">Survey name</p>
                </div>
                <div className="flex flex-col p-3 ">
                <input className="border border-gray-900 rounded p-1 m-1" aria-label="Date" type="date" onChange={(e) => setDate(e.target.value)}/>
                  <p className="text-right text-md">Date</p>
                </div>
                <div className="flex justify-center">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] justify-center">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.2rem] h-[1.3rem] w-[1.3rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      onChange={() => setCheck(!Check)}
                      id="checkboxDefault" />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer text-xl"
                      htmlFor="checkboxDefault">
                      Reoccuring
                    </label>
                  </div>
                </div>
                
                  <div className={"flex justify-center "+ (Check ? 'inline-block' : 'hidden')}>
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-row mx-3 mt-3 pt-3 justify-center">
                        <TESelect data={Number} label=""  onChange={(e) => setReocurring.Time(e.target.value)}/>
                        <TESelect data={Time} label=""  onChange={(e) => setReocurring.Multiplier(e.target.value)}/>
                      </div>
                      <p className="text-right text-md mr-3">Time</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-center">
              <div  className="w-1/2 flex justify-center">
                <button onClick={() => setGroupPage(!GroupPage)} type="button" className="py-3.5 my-5 mx-3 w-9/12 text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center">Select Group(s)</button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <Link to={"/SelectTemplate/" + id } className={"w-1/2 flex justify-center " + (id != "0" ? 'hidden': 'block')}>
                  <button type="button" className={"py-3.5 mx-3 w-9/12 text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center"}>Create Survey</button>
                </Link>
                <Link to={"/SelectTemplate/" + id } className={"w-1/2 flex justify-center " + (id == "0" ? 'hidden': 'Block')}>
                  <button type="button" className={"py-3.5 mx-3 w-9/12 text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center"}>Questions</button>
                </Link>
              </div>
            </div>
            <Back />
          </div>
        </div>

        <div className={" "+ (GroupPage ? 'block' : 'hidden')}>
          <div className="flex flex-col p-3">
              <h1 className="p-2 text-center text-4xl">Select Groups</h1>
              <div className="flex flex-col p-3 justify-center">
                {groups.map((group) => {
                    return (
                      <div className="flex justify-center">
                        <button onClick={() => handleToggleChange(group.id)}>
                          <div className={"m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border " + (Selectedgroups.includes(group.id) ? 'bg-blue-600' : 'bg-white')}>
                            <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{group.GroupName}</h5>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

            <div className="flex justify-center">
            <div className="w-1/2">
              <button onClick={() => setGroupPage(!GroupPage)} type="button" className="py-3.5 my-7 mx-3 w-full font-medium text-white bg-[#170699] hover:text-[#AB1AAB] hover:underline rounded-lg text-center">Back</button>
            </div>
          </div>
          </div>
      </div>
    );
  }
  export default CreateSurveys;
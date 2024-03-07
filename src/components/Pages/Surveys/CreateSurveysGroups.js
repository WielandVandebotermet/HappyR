import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import GroupApi from "../../../API/GroupAPi";

function CreateSurveys() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [Selectedgroups, setSelectedgroups] = useState([]);
  const groupApi = new GroupApi();

  const getGroups = async () => {
    try {
      const result = groupApi.all();
      setGroups(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    getGroups()
  }, []);


    return (
      <div class=" min-h-screen">
        <div class="flex flex-col p-3">
            <h1 class="p-2 text-center text-4xl">Select Groups</h1>
            <div class="flex flex-col p-3 justify-center">
              {groups.map((group) => {
                  return (
                    <div class="flex justify-center ">
                      <Link to={"/GroupOverview/" + group.id}>
                        <div class="m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{group.GroupName}</h5>
                        </div>
                      </Link>
                    </div>
                  )
                })}
          </div>
        </div>

        <div class="flex flex-col">
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
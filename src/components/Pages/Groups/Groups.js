import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import GroupApi from "../../../API/GroupAPi";

function Groups() {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
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

  const handleAddGroup = () => {
    groupApi.add(groupName);
    setShowModal(false);
    setGroupName("");
    getGroups(); // Refresh groups after adding a new one
    console.log("groupName:", groupName);
  }

    return (
      <div>
        <div class="min-h-screen">

          <div class="flex flex-col p-3">
            <h1 class="p-2 text-center text-4xl">Groups</h1>
            <div class="flex flex-col p-3 justify-center">
                {groups.map((group) => {
                  return (
                    <div class="flex justify-center ">
                      <Link to={"/GroupOverview/" + group.id}>
                        <div class="m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{group.GroupName}</h5>
                          <p class="text-right text-sm">XX GroupMembers</p>
                        </div>
                      </Link>
                    </div>
                  )
                })}

            </div>
          </div>

          <div class="flex flex-col">
              <div class="flex justify-center">
                <button onClick={() => setShowModal(true)} type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Create Group</button>
              </div>
            <Link onClick={() => navigate(-1)}>
              <div class="flex justify-center">
                <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
              </div>
            </Link>
          </div>
        </div>

        <TEModal show={showModal} setShow={setShowModal}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>

                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Create Group
                </h5>
              </TEModalHeader>
              {/* <!--Modal body--> */}
              <TEModalBody>
                <div className="flex flex-col p-3 ">
                  <input className="border border-gray-900 rounded p-1 m-1" type="text" name="Groupname" label="Enter group name here" value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
                  <p className="text-right text-md">GroupName</p>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div class="flow-root">
                  <button
                    type="button"
                    className="float-left inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  <button
                    type="button"  onClick={handleAddGroup}
                    className="float-right ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                  >
                    Save changes
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal> 
      </div>
    );
  }
  export default Groups;
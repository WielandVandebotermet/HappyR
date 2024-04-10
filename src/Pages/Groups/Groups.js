import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import {
  TERipple, TEModal, TEModalDialog, TEModalContent,
  TEModalHeader, TEModalBody, TEModalFooter, } from "tw-elements-react";
import GroupApi from "../../API/GroupApi";
import MTUApi from "../../API/MTUApi";
import Back from "../../components/Navigation/Back"

function Groups() {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [GU, setGU] = useState([]);
  const [M, setM] = useState([]);
  const [UserId, setuserId] = useState(Cookies.get("UserId") || 0);
  const [groupName, setGroupName] = useState("");

  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getAllTeams();
      setGroups(response);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  };

const fetchGroupMembers = async () => {
  try {
    const groupUsers  = await MTUApi.getAllGroupUsers();
    const managers  = await MTUApi.getAllManagers();
    console.log(groupUsers);
    //console.log(managers);
    setGU(groupUsers);
    setM(managers);
  } catch (error) {
    console.error('Error fetching groups:', error.message);
  }
};

  useEffect(() => {
    fetchGroups();
    fetchGroupMembers();
  }, []);

  const handleAddGroup = async () => {
    try {
      await GroupApi.createTeam(groupName, UserId);
      setGroupName("");
      fetchGroups();
      fetchGroupMembers();
    } catch (error) {
      console.error('Error adding group:', error.message);
    }
  };

  const calculateGroupMembers = (groupId) => {
    if(!GU || !M){return 0}
    const groupGU = GU.filter(user => user.team.id === groupId);
    const groupM = M.filter(manager => manager.team.id === groupId);

    return groupGU.length + groupM.length;
  };
  

  if (!groups || !GU || !M) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
      <div className="">
        <div className="flex flex-col p-3">
          <h1 className="p-2 text-center text-4xl">Groups</h1>
          <div className="flex flex-col p-3 justify-center">
            {groups.map((group) => (
              <div key={group.id} className="flex justify-center">
                <Link to={"/GroupOverview/" + group.id}>
                  <div className="m-4 p-6 rounded-lg border-gray-900 hover:border-blue-600 border">
                    <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{group.groupName}</h5>
                    <p className="text-right text-sm">{calculateGroupMembers(group.id)} Group Members</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center">
            <button onClick={() => setShowModal(true)} type="button" className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Create Group</button>
          </div>
          <Back />
        </div>
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
                <div className="flow-root">
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
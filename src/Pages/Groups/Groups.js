import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import GroupApi from "../../API/GroupApi";
import MTUApi from "../../API/MTUApi";
import Back from "../../components/Navigation/Back";
import { useNavigate } from "react-router-dom";

function Groups() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [GU, setGU] = useState();
  const [M, setM] = useState();
  const UserId = Cookies.get("UserId");
  const [groupName, setGroupName] = useState('');

  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getAllTeams();
      if (Array.isArray(response)) {
        setGroups(response);
      } else {
        setGroups([]); // Set groups to an empty array
      }
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  const fetchGroupMembers = async () => {
    try {
      const groupUsers = await MTUApi.getAllGroupUsers();
      const managers = await MTUApi.getAllManagers();
      setGU(groupUsers);
      setM(managers);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
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
      console.error("Error adding group:", error.message);
    }
    navigate(0);
  };

  const calculateTotalMembers = (groupId) => {
    if (!GU || !M) {
      return 0;
    }
    const groupGU = GU.filter((user) => user.team.id === groupId);
    const groupM = M.filter((manager) => manager.team.id === groupId);

    return groupGU.length + groupM.length;
  };

  const calculateGroupMembers = (groupId) => {
    if (!GU) {
      return 0;
    }
    const groupGU = GU.filter((user) => user.team.id === groupId);

    return groupGU.length;
  };

  const calculateManagers = (groupId) => {
    if (!M) {
      return 0;
    }
    const groupM = M.filter((manager) => manager.team.id === groupId);

    return groupM.length;
  };

  if (!groups || !GU || !M) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="">
          <div className="flex flex-col p-3">
            <h1 className="p-2 text-center text-4xl text-StrongBlue">Groups</h1>
            <div className="flex flex-wrap justify-center ">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3"
                >
                  <Link to={"/GroupOverview/" + group.id}>
                    <div className="m-4 p-6 rounded-lg text-StrongBlue border-StrongBlue hover:text-MineralGreen border">
                      <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {group.groupName}
                      </h5>
                      <div className="flex justify-between text-sm">
                        <p>{calculateManagers(group.id)} Managers</p>
                        <p>{calculateGroupMembers(group.id)} Group Members</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(true)}
                type="button"
                className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] text-AccentRed border-MineralGreen hover:bg-MineralGreen01 hover:text-white rounded-lg text-center"
              >
                Create Group
              </button>
            </div>
            <Back />
          </div>
        </div>
      </div>

      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog centered>
          <TEModalContent className="bg-[#ffffff]">
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-AccentRed">
                Create Group
              </h5>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div className="flex flex-col p-3 text-StrongBlue">
                <input
                  className="border border-gray-900 rounded p-1 m-1"
                  type="text"
                  name="Groupname"
                  label="Enter group name here"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                ></input>
                <p className="text-right text-md">GroupName</p>
              </div>
            </TEModalBody>
            <TEModalFooter>
              <div className="flow-root">
                <button
                  type="button"
                  className="float-left inline-block rounded hover:bg-BGAccentRed bg-AccentRed text-[#ffffff] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleAddGroup}
                  className="float-right ml-1 inline-block rounded hover:bg-StrongBlueHover bg-StrongBlue text-AccentRed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
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

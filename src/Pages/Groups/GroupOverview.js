import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
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
import Cookies from "js-cookie";

function GroupOverview() {
  const [UserId] = useState(Cookies.get("UserId") || 0);
  const [Manager, setManager] = useState(false);
  const [Key, setkey] = useState({});
  const [groupName, setGroupName] = useState("");
  const { id } = useParams();
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [GU, setGU] = useState([]);
  const [M, setM] = useState([]);
  const [group, setGroup] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getTeamById(id);
      setGroup(response);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  const fetchGroupMembers = async () => {
    try {
      const GU = await MTUApi.getTeamUsersByTeamId(group.id);
      const M = await MTUApi.getManagersByTeamId(group.id);
      setGU(GU);
      setM(M);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  const CheckManager = async () => {
    for (let i = 0; i < M.length; i++) {
      if (UserId == M[i].user.id) {
        setManager(true);
      }
    }
  };

  const ChangeGroupName = async () => {
    try {
      await GroupApi.editTeam(groupName, group.id);
      fetchGroups();
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  const DeleteUser = async () => {
    try {
      if (Key.Type === "M") {
        await MTUApi.deleteManager(Key.id);
      } else if (Key.Type === "GU") {
        await MTUApi.deleteGroupUser(Key.id);
      }
      fetchGroupMembers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (group.id) {
      fetchGroupMembers();
    }
  }, [group]);

  useEffect(() => {
    if (M) {
      CheckManager();
    }
  }, [M]);

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="">
        <div className="flex flex-col p-3 justify-center text-StrongBlue">
          <h1 className="p-2 text-center text-4xl">{group.groupName}</h1>
          <button
            onClick={() => setShowModalForm(true)}
            className={
              "hover:underline hover:text-MineralGreen " + (Manager ? "inline-block" : "hidden")
            }
            type="button"
          >
            Edit
          </button>
          <div className="flex flex-col p-3 justify-center">
            <h1 className="p-2 text-center text-2xl">Manager</h1>
            <div className="flex justify-center">
              <ul className="divide-y divide-gray-400 w-1/3">
                {M.map((manager) => (
                  <li key={manager.id} className="flex gap-x-6 justify-center">
                    <button
                      onClick={() => {
                        setShowModalDelete(true);
                        setkey({ ...manager, Type: "M" });
                      }}
                      type="button"
                      className="rounded hover:bg-gray-200 p-5 hover:text-MineralGreen"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={manager.user.profileImage}
                          alt="User profileImage"
                        />
                        <div className="min-w-0 flex-auto ">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {manager.user.firstName} {manager.user.lastName}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {manager.user.email}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <h1 className="p-2 text-center text-2xl">Group Members</h1>
            <div className="flex justify-center">
              <ul className="divide-y divide-gray-400 w-1/3">
                {GU.map((GroupUser) => (
                  <li
                    key={GroupUser.id}
                    className="flex gap-x-6 justify-center"
                  >
                    <button
                      onClick={() => {
                        setShowModalDelete(true);
                        setkey({ ...GroupUser, Type: "GU" });
                      }}
                      type="button"
                      className="rounded p-5 hover:text-MineralGreen"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={GroupUser.user.profileImage}
                          alt="User profileImage"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {GroupUser.user.firstName} {GroupUser.user.lastName}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {GroupUser.user.email}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Link to={"/AddToGroup/" + group.id}>
            <div
              className={
                "flex justify-center " + (Manager ? "inline-block" : "hidden")
              }
            >
              <button
                type="button"
                className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium  border-[5px] text-AccentRed border-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
              >
                Add User
              </button>
            </div>
          </Link>
          <Back />
        </div>
      </div>
      <div className={" " + (Manager ? "inline-block" : "hidden")}>
        <TEModal show={showModalForm} setShow={setShowModalForm}>
          <TEModalDialog centered>
            <TEModalContent className="bg-[#ffffff]">
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-AccentRed">
                  Change Group Name
                </h5>
              </TEModalHeader>
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
                    onClick={() => setShowModalForm(false)}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowModalForm(false);
                      ChangeGroupName();
                    }}
                    className="float-right ml-1 inline-block rounded hover:bg-StrongBlueHover bg-StrongBlue text-AccentRed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                  >
                    Save changes
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>

        <TEModal show={showModalDelete} setShow={setShowModalDelete}>
          <TEModalDialog centered>
            <TEModalContent className="bg-[#ffffff]">
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-AccentRed" >
                  Delete {Key.user && Key.user.firstName}{" "}
                  {Key.user && Key.user.lastName} from {group.groupName}
                </h5>
              </TEModalHeader>
              <TEModalBody>
                <div className="flex flex-col p-3 text-StrongBlue">
                  <p className="text-XL">
                    Are you sure you want to delete this user from{" "}
                    {group.groupName}?
                  </p>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div className="flow-root">
                  <button
                    type="button"
                    className="bg-StrongBlue02 hover:bg-StrongBlueHover text-white float-left inline-block rounded bg-gray-200 px-6 pb-2 pt-2.5 text-md leading-normal text-black hover:bg-gray-400 "
                    onClick={() => setShowModalDelete(false)}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="bg-AccentRed hover:bg-BGAccentRed text-white float-right ml-1 inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-md leading-normal hover:bg-red-800 "
                    onClick={() => {
                      setShowModalDelete(false);
                      DeleteUser();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </div>
  );
}
export default GroupOverview;

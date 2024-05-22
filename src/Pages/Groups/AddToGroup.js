import { useParams } from "react-router-dom";
import Select from "react-select";
import { useState, useEffect } from "react";
import GroupApi from "../../API/GroupApi";
import UserApi from "../../API/UserApi";
import Back from "../../components/Navigation/Back";
import MTUApi from "../../API/MTUApi";

function AddToGroup() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  const getUsers = async () => {
    try {
      const result = await UserApi.getAllUsers();
      const GU = await MTUApi.getTeamUsersByTeamId(group.id);
      const M = await MTUApi.getManagersByTeamId(group.id);

      const groupGU = GU.map((user) => user.user.id);
      const groupM = M.map((manager) => manager.user.id);

      const filteredUsers = result.filter(
        (user) => !groupM.includes(user.id) && !groupGU.includes(user.id)
      );

      const transformedUsers = filteredUsers.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
        icon: `${user.profileImage}`,
        email: `${user.email}`,
      }));

      setUsers(transformedUsers);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  const getGroup = async () => {
    try {
      const result = await GroupApi.getTeamById(id);
      setGroup(result);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const onChange = (selectedOptions) => {
    addUserList(selectedOptions);
  };

  const addUserList = async (user) => {
    const updatedUsers = users.filter((u) => u.value !== user.value);
    setUsers(updatedUsers);

    setAddedUsers((prevAddedUsers) => [...prevAddedUsers, user]);
  };

  const RemoveUserList = async (userId) => {
    const userToRemove = addedUsers.find((user) => user.value === userId);

    if (userToRemove) {
      setUsers((prevUsers) => [...prevUsers, userToRemove]);

      const updatedAddedUsers = addedUsers.filter(
        (user) => user.value !== userId
      );
      setAddedUsers(updatedAddedUsers);
    }
  };

  const AddGroupMember = async (addedUsers) => {
    try {
      for (const user of addedUsers) {
        const teamId = group.id;
        const userId = user.value;
        await MTUApi.createGroupUser(teamId, userId);
      }
      getUsers();
      setAddedUsers([]);
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  const AddManager = async (addedUsers) => {
    try {
      for (const user of addedUsers) {
        const teamId = group.id;
        const userId = user.value;
        await MTUApi.createManager(teamId, userId);
      }
      getUsers();
      setAddedUsers([]);
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    if (group.id) {
      getUsers();
    }
  }, [group]);

  if (!group && !users) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <div className="flex flex-col p-3 justify-center text-StrongBlue">
        <h1 className="p-2 text-center text-4xl">{group.groupName}</h1>
        <div className="flex flex-col p-3 justify-center">
          <h1 className="p-2 text-center text-2xl">Users</h1>
          <div className="flex justify-center">
            <Select
              className="w-1/3 text-StrongBlue"
              options={users}
              formatOptionLabel={(user) => (
                <div className="flex items-center">
                <img src={user.icon} alt="user-image" className="w-auto h-8 mr-2" />
                <span>{user.label}</span>
                <span className="pl-3 text-StrongBlueHover">{user.email}</span>
              </div>
              )}
              value={selected}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center">
            <ul className="divide-y divide-gray-400 w-1/3">
              {addedUsers.map((user) => (
                <li key={user.value} className="flex gap-x-6 justify-center">
                  <button
                    onClick={() => RemoveUserList(user.value)}
                    type="button"
                    className="rounded hover:text-MineralGreen p-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src={user.icon}
                        alt="User profileImage"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {user.label}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {user.email}
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
        <div className="flex justify-center">
          <button
            onClick={() => AddGroupMember(addedUsers)}
            type="button"
            className="py-2 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] text-AccentRed border-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
          >
            Add GroupMember(s)
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => AddManager(addedUsers)}
            type="button"
            className="py-2 mt-7 mx-3 w-full max-w-screen-sm text-base font-medium  border-[5px] text-AccentRed border-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
          >
            Add Manager(s)
          </button>
        </div>
        <Back />
      </div>
    </div>
  );
}
export default AddToGroup;

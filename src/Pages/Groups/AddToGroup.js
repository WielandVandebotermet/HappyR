import {useNavigate, useParams} from "react-router-dom";
import Select from 'react-select'
import { useState, useEffect } from "react";
import GroupApi from "../../API/GroupApi";
import UserApi from "../../API/UserApi";
import Back from "../../components/Back"

function AddToGroup() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  const getGroup = async () => {
    try {
      const result = await GroupApi.getTeamById(id);
      setGroup(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }
  const getUsers = async () => {
    try {
      const result = await UserApi.getAllUsers();
      const transformedUsers = result.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
      }));
      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const addUser = (userId) => {
    return 1;
  };

  const RemoveAddedUser = (userId) => {
    return 1;
  };

  const onChange = async () => {
    console.log()
  };

  useEffect(() => {
    getGroup();
    getUsers();
  }, []);

  if (!group) {
    return <div>Loading...</div>;
  }

  console.log("users: ", users);

    return (
      <div className="">

        <div className="flex flex-col p-3 justify-center">
          <h1 className="p-2 text-center text-4xl">{group.groupName}</h1>
          <div className="flex flex-col p-3 justify-center">
            <h1 className="p-2 text-center text-2xl">Users</h1>
            <div className="flex justify-center">
            <Select className="w-1/3" options={users} onChange={onChange()}/>
            </div>
            <div className="flex justify-center">
            <ul className="divide-y divide-gray-400 w-1/3">
            {addedUsers.map((user) => (
                  <li key={"user:" +  user.id} className="flex gap-x-6 justify-center">
                    <button onClick={() => RemoveAddedUser(user.id)} type="button" className="rounded hover:bg-gray-200 p-5">
                    <div className="flex min-w-0 gap-x-4">
                      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{user.user.firstName} {user.user.lastName}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Email</p>
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
              <button  type="button" className="py-2 mx-3 w-full max-w-screen-sm text-base font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Add GroupMember(s)</button>
            </div>
            <div className="flex justify-center">
              <button  type="button" className="py-2 mt-7 mx-3 w-full max-w-screen-sm text-base font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Add Manager(s)</button>
            </div>
            <Back />
        </div>

      </div>
    );
  }
  export default AddToGroup;
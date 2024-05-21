import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/Auth/LogoutButton";
import Back from "../../components/Navigation/Back";
import userApi from "../../API/UserApi";
import MTUApi from "../../API/MTUApi";
import Cookies from "js-cookie";

function Profile() {
  const { user, isAuthenticated} = useAuth0();
  const UserId = Cookies.get("UserId");
  const [GroupsM, SetGroupsM] = useState([]);
  const [GroupsGU, SetGroupsGU] = useState([]);

  const fetchGroups = async () => {
    try {
      const GroupM = await MTUApi.getManagerByUserId(UserId);
      const GroupGU = await MTUApi.getGUByUserId(UserId);
      SetGroupsM(GroupM);
      SetGroupsGU(GroupGU);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user]);

  if (!GroupsGU || !GroupsM || !user) {
    return <div>...Loading</div>;
  }

  return (
    <div className="flex flex-col p-3 ">
      <div className="flex flex-row justify-center p-3">
        <div className="flex justify-between">
          <img
            className="h-48 w-48 flex-none rounded-full bg-gray-50"
            src={user.picture}
            alt={user.name}
          />
        </div>
        <div className="pl-8 pr-8 pt-8 flex flex-col justify-between text-xl">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <LogoutButton />
        </div>
      </div>
      <div>
        <h1 className="flex justify-center underline text-2xl">Groups</h1>
        {GroupsM.length > 0 &&
          GroupsM.map((group) => (
            <div key={group.id} className="flex justify-center p-2 text-xl">
              {group.team.groupName} : Manager
            </div>
          ))}
        {GroupsGU.length > 0 &&
          GroupsGU.map((group) => (
            <div key={group.id} className="flex justify-center p-2 text-xl">
              {group.team.groupName} : Member
            </div>
          ))}
        {GroupsM.length === 0 && GroupsGU.length === 0 && (
          <div className="flex justify-center p-2 text-xl">
            You are not part of a group yet.
          </div>
        )}
      </div>
      <Back />
    </div>
  );
}
export default Profile;

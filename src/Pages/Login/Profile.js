import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/Auth/LogoutButton";
import Back from "../../components/Navigation/Back";
import MTUApi from "../../API/MTUApi";

function Profile() {
  // Auth0 hook to access user information and authentication status
  const { user, isAuthenticated } = useAuth0();

  // Get user ID from local storage
  const UserId = localStorage.getItem('UserId');

  // State variables to store user's managed groups and group memberships
  const [GroupsM, SetGroupsM] = useState([]);
  const [GroupsGU, SetGroupsGU] = useState([]);

  // Fetch user's managed groups and group memberships
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

  // Fetch groups on component mount or when user information changes
  useEffect(() => {
    fetchGroups();
  }, [user]);

  // Render loading screen if group data is not yet available
  if (!GroupsGU || !GroupsM || !user) {
    return <div>...Loading</div>;
  }

  // Render the profile information and group memberships
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

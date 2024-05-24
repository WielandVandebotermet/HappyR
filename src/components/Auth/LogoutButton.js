import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * LogoutButton component renders a button to log the user out.
 */
const LogoutButton = () => {
  const { logout } = useAuth0();

  /**
   * Handles the click event of the logout button.
   * Calls the logout function from useAuth0 to log the user out.
   */
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <button
      className="m-auto py-3.5 w-full font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 e rounded-lg text-center"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;

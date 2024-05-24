import { NavLink } from "react-router-dom";

/**
 * Footer component renders a footer section with a link to an external website.
 */
function Footer() {
  return (
    <div className="absolute bottom-0 mt-2 left-0 w-full hover:text-MineralGreen text-AccentRed bg-StrongBlue01">
      {/* NavLink used to create a link */}
      <NavLink to="https://wieland.sinners.be/">
        <div className="text-center p-4">
          HappyR - Wieland Vandebotermet - © 2024
        </div>
      </NavLink>
    </div>
  );
}

export default Footer;

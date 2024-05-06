import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-screen bg-StrongBlue01 py-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-StrongBlue01">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={process.env.PUBLIC_URL + "/images/HappyR_Logo_Transparant.png"}
            className="h-10 rounded"
            alt="HappyR Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap hover:text-MineralGreen text-AccentRed">
            HappyR
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium center flex flex-col p-4 md:p-0 mt-4 border rounded-lg text-AccentRed md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <Link
              to="/"
              className="text-xl block py-2 px-3 rounded hover:text-MineralGreen hover:underline md:border-0 md:p-2"
              activeclass="underline"
            >
              Home
            </Link>
            <Link
              to="/Groups"
              className="text-xl block py-2 px-3 rounded hover:text-MineralGreen hover:underline md:border-0 md:p-2"
              activeclass="underline"
            >
              Groups
            </Link>
            <Link
              to="/Surveys"
              className="text-xl block py-2 px-3 rounded hover:text-MineralGreen hover:underline md:border-0 md:p-2"
              activeclass="underline"
            >
              Surveys
            </Link>
            <Link
              to="/Profile"
              className="text-xl block py-2 px-3 rounded hover:text-MineralGreen hover:underline md:border-0 md:p-2"
              activeclass="underline"
            >
              Profile
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

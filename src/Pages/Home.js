// Importing necessary dependencies from React Router DOM
import { NavLink } from "react-router-dom";

// Functional component for the Home page
function Home() {
    // Rendering the Home page layout
    return (
        <div className="flex flex-col h-auto text-StrongBlue border-StrongBlue">
          {/* Main content section */}
          <div className="p-3 m-auto">
            <div className="flex flex-row p-3 justify-center">
                {/* Surveys section */}
                <div className="block max-w-sm m-4 p-6 border rounded-lg hover:text-MineralGreen">
                {/* Link to Surveys page */}
                <NavLink to="/Surveys">
                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Surveys</h5>
                  <p className="hidden md:block font-normal text-gray-700">Find here all your completed and uncompleted surveys.</p>
                  </NavLink>
                </div>
                {/* Profile section */}
                <div className="block max-w-sm m-4 p-6 border rounded-lg hover:text-MineralGreen">
                {/* Link to Profile page */}
                <NavLink to="/Profile">
                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Profile</h5>
                  <p className="hidden md:block font-normal text-gray-700 ">Your profile where you can change language and other things.</p>
                  </NavLink>
                </div>
              </div>
            <div className="flex flex-row p-3 justify-center">
              {/* Groups section */}
              <div className="w-1/2 block max-w-sm m-4 p-6 border rounded-lg hover:text-MineralGreen">
                {/* Link to Groups page */}
                <NavLink to="/Groups" >
                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Groups</h5>
                  <p className="hidden md:block font-normal text-gray-700 ">Find here all your groups you are part of.</p>
                </NavLink>
              </div>
              {/* Results section */}
              <div className="w-1/2 block max-w-sm m-4 p-6 rounded-lg shadow border hover:text-MineralGreen">
                {/* Link to Results page */}
                <NavLink to="/Results">
                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Results</h5>
                  <p className="hidden md:block font-normal text-gray-700">See the results of the surveys here.</p>
                </NavLink>
              </div>
            </div>
            {/* Button to fill in survey */}
            <NavLink to="/Surveys">
              <div className="flex justify-center">
                <button type="button" className="p-5 m-5 sm:w-fit text-AccentRed md:w-full font-medium  border-[5px] border-MineralGreen hover:bg-MineralGreen01 hover:text-white rounded-lg text-center">Fill in survey</button>
              </div>
            </NavLink>
          </div>
        </div>
    );
}

// Exporting the Home component as the default export
export default Home;

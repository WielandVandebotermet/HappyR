import { NavLink} from "react-router-dom";
function Home() {
    return (
        <div className="flex flex-col h-auto text-StrongBlue border-StrongBlue">
          <div className="p-3 m-auto">
            <div className="flex flex-row p-3 justify-center">
                <div className="block max-w-sm m-4 p-6  border rounded-lg hover:text-MineralGreen">
                <NavLink to="/Surveys">
                  <h5 className=" text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Surveys</h5>
                  <p className="hidden md:block font-normal text-gray-700">Find here all you completed and uncompleted surveys.</p>
                  </NavLink>
                </div>

                <div className="block max-w-sm m-4 p-6  border rounded-lg hover:text-MineralGreen">
                <NavLink to="/Profile">
                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Profile</h5>
                  <p className="hidden md:block font-normal text-gray-700 ">Youre profile where you can change language and other things.</p>
                  </NavLink>
                </div>

              </div>
            <div className="flex flex-row p-3 justify-center">
              <div className="w-1/2 block max-w-sm m-4 p-6 border rounded-lg hover:text-MineralGreen">
                <NavLink to="/Groups" >
                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Groups</h5>
                  <p className="hidden md:block font-normal text-gray-700 ">Find here all you groups you are part of.</p>
                </NavLink>
              </div>

              <div className="w-1/2 block max-w-sm m-4 p-6 rounded-lg shadow border hover:text-MineralGreen">
                <NavLink to="/Results">
                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Results</h5>
                  <p className="hidden md:block font-normal text-gray-700">See the results of the surveys here..</p>
                </NavLink>
              </div>

            </div>
            <NavLink to="/Surveys">
              <div className="flex justify-center">
                <button type="button" className="p-5 m-5 sm:w-fit text-AccentRed md:w-full font-medium  border-[5px] border-MineralGreen hover:bg-MineralGreen01 hover:text-white rounded-lg text-center">Fill in survey</button>
              </div>
            </NavLink>
          </div>
        </div>
    );
  }
  export default Home;
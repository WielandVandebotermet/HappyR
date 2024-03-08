import { NavLink} from "react-router-dom";

function Home() {
    return (
        <div class="flex flex-col min-h-screen">
          <div class="p-3 m-auto">
            <div class="flex flex-row p-3 justify-center">
                <div class="block max-w-sm m-4 p-6  border rounded-lg border-gray-900  hover:border-blue-600">
                <NavLink to="/Surveys">
                  <h5 class=" text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Surveys</h5>
                  <p class="hidden md:block font-normal text-gray-700">Find here all you completed and uncompleted surveys.</p>
                  </NavLink>
                </div>

                <div class="block max-w-sm m-4 p-6  border rounded-lg border-gray-900  hover:border-blue-600">
                <NavLink to="/Profile">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Profile</h5>
                  <p class="hidden md:block font-normal text-gray-700 ">Youre profile where you can change language and other things.</p>
                  </NavLink>
                </div>

              </div>
            <div class="flex flex-row p-3 justify-center">
              <div class="w-1/2 block max-w-sm m-4 p-6 border rounded-lg border-gray-900  hover:border-blue-600">
                <NavLink to="/Groups" >
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Groups</h5>
                  <p class="hidden md:block font-normal text-gray-700 ">Find here all you groups you are part of.</p>
                </NavLink>
              </div>

              <div class="w-1/2 block max-w-sm m-4 p-6 rounded-lg shadow border border-gray-900  hover:border-blue-600">
                <NavLink to="/Results">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Results</h5>
                  <p class="hidden md:block font-normal text-gray-700">See the results of the surveys here..</p>
                </NavLink>
              </div>

            </div>
            <NavLink to="/Surveys#Unanswered">
              <div class="flex justify-center">
                <button type="button" class="p-5 m-5 sm:w-fit  md:w-full font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center">Fill in survey</button>
              </div>
            </NavLink>
          </div>
        </div>
    );
  }
  export default Home;
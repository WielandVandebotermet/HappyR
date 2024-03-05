import { NavLink} from "react-router-dom";

function Home() {
    return (
        <div class="flex flex-col min-h-screen">
          <div class="p-3 m-auto">
            <div class="flex flex-row p-3 justify-center">
              <NavLink to="/" class="w-1/2">
                <div class="block max-w-sm m-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Surveys</h5>
                  <p class="hidden md:block font-normal text-gray-700 dark:text-gray-400">Find here all you completed and uncompleted surveys.</p>
                </div>
              </NavLink>
              <NavLink to="/Profile" class="w-1/2">
                <div class="block max-w-sm m-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h5>
                  <p class="hidden md:block font-normal text-gray-700 dark:text-gray-400">Youre profile where you can change language and other things.</p>
                </div>
              </NavLink>
              </div>
            <div class="flex flex-row p-3 justify-center">
              <NavLink to="/Groups" class="w-1/2">
                <div class="block max-w-sm m-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Groups</h5>
                  <p class="hidden md:block font-normal text-gray-700 dark:text-gray-400">Find here all you groups you are part of.</p>
                </div>
              </NavLink>
              <NavLink to="/Surveys" class="w-1/2">
                <div class="block max-w-sm m-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Survey</h5>
                  <p class="hidden md:block font-normal text-gray-700 dark:text-gray-400">Create surveys for groups to test the work satisfaction.</p>
                </div>
              </NavLink>
            </div>
            <div class="flex justify-center">
              <button type="button" class="px-6 py-3.5 my-7 w-1/4 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Fil in survey</button>
            </div>
          </div>
        </div>
    );
  }
  export default Home;
import { NavLink} from "react-router-dom";

function Groups() {
    return (
      <div class="min-h-screen">

        <div class="flex flex-col p-3 justify-center">
          <h1 class="p-2 text-center text-4xl">Groups</h1>
          <div class="flex flex-row p-3 justify-center">
            <NavLink to="/">
              <div class="block max-w-sm m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Group Name</h5>
                <p class="text-right text-sm">XX GroupMembers</p>
              </div>
            </NavLink>
          </div>
        </div>

        <div class="flex flex-col">
          <NavLink to="/">
            <div class="flex justify-center">
              <button type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Create Group</button>
            </div>
          </NavLink>
          <NavLink to="/">
            <div class="flex justify-center">
              <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
            </div>
          </NavLink>
        </div>

      </div>
    );
  }
  export default Groups;
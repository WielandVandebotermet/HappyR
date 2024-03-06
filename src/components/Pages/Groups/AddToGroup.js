import { NavLink, Navigate} from "react-router-dom";
import { TEInput } from 'tw-elements-react';

function AddToGroup() {
  
    return (
      <div class="min-h-screen">

        <div class="flex flex-col p-3 justify-center">
          <h1 class="p-2 text-center text-4xl">Group: GroupName</h1>
          <div class="flex flex-col p-3 justify-center">
            <h1 class="p-2 text-center text-2xl">Users</h1>
            <div class="flex justify-center">
            <TEInput  type="search" label="Find User"></TEInput>
            </div>
            <div class="flex justify-center">
            <ul class="divide-y divide-gray-400 w-1/3">
            <li class="flex gap-x-6 justify-center">
                    <button onClick="" type="button" class="rounded hover:bg-gray-200 p-5">
                    <div class="flex min-w-0 gap-x-4">
                      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                      <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                      </div>
                    </div>
                    </button>
                  </li>
              <li class="flex gap-x-6 justify-center py-5">
                      <div class="flex min-w-0 gap-x-4">
                        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                        <div class="min-w-0 flex-auto">
                          <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                          <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                        </div>
                      </div>
              </li>
            </ul>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
            <div class="flex justify-center">
              <button  type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Add User/Manager</button>
            </div>
          <NavLink to={Navigate(-1)}>
            <div class="flex justify-center">
              <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
            </div>
          </NavLink>
        </div>

      </div>
    );
  }
  export default AddToGroup;
import {Link, useNavigate, useParams} from "react-router-dom";
import { TEInput } from 'tw-elements-react';
import { useState, useEffect } from "react";
import GroupApi from "../../../API/GroupAPi";

function AddToGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState([]);

  const getGroup = async () => {
    try {
      const groupApi = new GroupApi();
      const result = groupApi.getGroupById(id);
      setGroup(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    getGroup()
  }, []);

    return (
      <div class="min-h-screen">

        <div class="flex flex-col p-3 justify-center">
          <h1 class="p-2 text-center text-4xl">{group.GroupName}</h1>
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
              <button  type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center">Add GroupMember(s)</button>
            </div>
            <div class="flex justify-center">
              <button  type="button" class="py-3.5 mt-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center">Add Manager(s)</button>
            </div>
            <Link onClick={() => navigate(-1)}>
            <div class="flex justify-center">
              <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600  rounded-lg text-center">Back</button>
            </div>
          </Link>
        </div>

      </div>
    );
  }
  export default AddToGroup;
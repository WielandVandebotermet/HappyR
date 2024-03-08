import { Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import GroupApi from "../../API/GroupAPi";
import Back from "../../components/Back"

function GroupOverview() {
  const { id } = useParams();
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();

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
      <div>
        <div class="">

          <div class="flex flex-col p-3 justify-center">
          <h1 class="p-2 text-center text-4xl">{group.GroupName}</h1>
            <button onClick={() => setShowModalForm(true)} type="button">Edit</button>
            <div class="flex flex-col p-3 justify-center">
              <h1 class="p-2 text-center text-2xl">Manager</h1>
              <div class="flex justify-center">
                <ul class="divide-y divide-gray-400 w-1/3">
                  <li class="flex gap-x-6 justify-center">
                    <button onClick={() => setShowModalDelete(true)} type="button" class="rounded hover:bg-gray-200 p-5">
                    <div class="flex min-w-0 gap-x-4">
                      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                      <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                      </div>
                    </div>
                    </button>
                  </li>
                  <li class="flex gap-x-6 justify-center">
                    <button onClick={() => setShowModalDelete(true)} type="button" class="rounded hover:bg-gray-200 p-5">
                    <div class="flex min-w-0 gap-x-4">
                      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                      <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                      </div>
                    </div>
                    </button>
                  </li>
                  <li class="flex gap-x-6 justify-center">
                    <button onClick={() => setShowModalDelete(true)} type="button" class="rounded hover:bg-gray-200 p-5">
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
              <h1 class="p-2 text-center text-2xl">Group Members</h1>
              <div class="flex justify-center">
                <ul class="divide-y divide-gray-400 w-1/3">
                  <li class="flex gap-x-6 justify-center py-5 ">
                    <div class="flex min-w-0 gap-x-4">
                      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                      <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                      </div>
                    </div>
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
            <Link to={"/AddToGroup/" + group.id}>
              <div class="flex justify-center">
                <button type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Add User</button>
              </div>
            </Link>
            <Back />
          </div>

        </div>

        <TEModal show={showModalForm} setShow={setShowModalForm}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>

                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Change Group Name
                </h5>
              </TEModalHeader>
              <TEModalBody>
                <div class="flex flex-col p-3 ">
                  <input class="border border-gray-900 rounded p-1 m-1" type="text" name="Groupname" label="Enter group name here"></input>
                  <p class="text-right text-md">GroupName</p>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div class="flow-root">
                  <button
                    type="button"
                    className="float-left inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModalForm(false)}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="float-right ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Save changes
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal> 
        <TEModal show={showModalDelete} setShow={setShowModalDelete}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>

                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Delete User from [GroupName]
                </h5>
              </TEModalHeader>
              <TEModalBody>
                <div class="flex flex-col p-3 ">
                  <p class="text-XL">Are you sure you want to delete this user from [GroupName]?</p>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div class="flow-root">
                  <button
                    type="button"
                    className="float-left inline-block rounded bg-gray-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-gray-400 "
                    onClick={() => setShowModalDelete(false)}
                  >
                    No
                  </button>

                  <button
                    type="button"
                    className="float-right ml-1 inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white hover:bg-red-800 "
                  >
                    Yes
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal> 
      </div>
    );
  }
  export default GroupOverview;
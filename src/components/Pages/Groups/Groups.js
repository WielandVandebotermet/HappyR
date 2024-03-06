import { NavLink} from "react-router-dom";
import { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

function Groups() {
  const [showModal, setShowModal] = useState(false);
    return (
      <div>
        <div class="min-h-screen">

          <div class="flex flex-col p-3 justify-center">
            <h1 class="p-2 text-center text-4xl">Groups</h1>
            <div class="flex flex-row p-3 justify-center">
              <NavLink to="/GroupOverview">
                <div class="block max-w-sm m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Group Name</h5>
                  <p class="text-right text-sm">XX GroupMembers</p>
                </div>
              </NavLink>
            </div>
          </div>

          <div class="flex flex-col">
              <div class="flex justify-center">
                <button onClick={() => setShowModal(true)} type="button" class="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Create Group</button>
              </div>
            <NavLink to="/">
              <div class="flex justify-center">
                <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
              </div>
            </NavLink>
          </div>
        </div>

        <TEModal show={showModal} setShow={setShowModal}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>

                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Create Group
                </h5>
              </TEModalHeader>
              {/* <!--Modal body--> */}
              <TEModalBody>
                <div class="flex flex-col p-3 ">
                  <input class="border border-gray-900 rounded p-1 m-1" type="text" name="Groupname" label="Enter group name here" ></input>
                  <p class="text-right text-md">GroupName</p>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div class="flow-root">
                  <button
                    type="button"
                    className="float-left inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
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
      </div>
    );
  }
  export default Groups;
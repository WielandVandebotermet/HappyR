import {useNavigate, useParams} from "react-router-dom";
import { TEInput } from 'tw-elements-react';
import { useState, useEffect } from "react";
import TemplatesAPi from "../../API/TemplatesAPi";
import Back from "../../components/Back"

function ExternalPeople() {
    const { Sid, Tid } = useParams();
    const [template, setTemplate] = useState({});

    const getTemplate = async () => {
        try {
          const templatesAPi = new TemplatesAPi();
          const result = templatesAPi.getGroupById(Tid);
          setTemplate(result);
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      }
    
      useEffect(() => {
        getTemplate()
      }, []);

    return (
        <div class="">

        <div class="flex flex-col p-3 justify-center">
          <h1 class="p-2 text-center text-4xl">External People</h1>
          <div class="flex flex-col p-3 justify-center">
            <div class="flex justify-center">
            <TEInput type="Create" label="Enter Name"></TEInput>
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
            </ul>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
            <div class="flex justify-center">
              <button  type="button" class="py-2 mx-3 w-full max-w-screen-sm text-base font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Add External</button>
            </div>
            <Back />
        </div>

      </div>
    );
  }
  export default ExternalPeople;
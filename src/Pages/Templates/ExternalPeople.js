import {useNavigate, useParams} from "react-router-dom";
import { TEInput } from 'tw-elements-react';
import { useState, useEffect } from "react";
import TemplateApi from "../../API/TemplateApi";
import Back from "../../components/Navigation/Back"

function ExternalPeople() {
    const { Sid, Tid } = useParams();
    const [template, setTemplate] = useState({});

    const getTemplate = async () => {
        try {
          const result = TemplateApi.getGroupById(Tid);
          setTemplate(result);
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      }
    
      useEffect(() => {
        getTemplate()
      }, []);

    return (
        <div className="">

        <div className="flex flex-col p-3 justify-center">
          <h1 className="p-2 text-center text-4xl">External People</h1>
          <div className="flex flex-col p-3 justify-center">
            <div className="flex justify-center">
            <TEInput type="Create" label="Enter Name"></TEInput>
            </div>
            <div className="flex justify-center">
            <ul className="divide-y divide-gray-400 w-1/3">
            <li className="flex gap-x-6 justify-center">
                    <button onClick="" type="button" className="rounded hover:bg-gray-200 p-5">
                    <div className="flex min-w-0 gap-x-4">
                      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                      </div>
                    </div>
                    </button>
                  </li>
                  <li className="flex gap-x-6 justify-center">
                    <button onClick="" type="button" className="rounded hover:bg-gray-200 p-5">
                    <div className="flex min-w-0 gap-x-4">
                      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="" alt=""/>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                      </div>
                    </div>
                    </button>
                  </li>
            </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
            <div className="flex justify-center">
              <button  type="button" className="py-2 mx-3 w-full max-w-screen-sm text-base font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Add External</button>
            </div>
            <Back />
        </div>

      </div>
    );
  }
  export default ExternalPeople;
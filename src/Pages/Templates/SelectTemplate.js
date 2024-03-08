import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import TemplatesAPi from "../../API/TemplatesAPi";
import Back from "../../components/Back"

function Groups() {
  const [templates, setTemplates] = useState([]);
  const templatesAPi = new TemplatesAPi();

  const getTemplates = async () => {
    try {
      const result = templatesAPi.all();
      setTemplates(result);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    getTemplates()
  }, []);


    return (
        <div class="">

          <div class="flex flex-col p-3">
            <h1 class="p-2 text-center text-4xl">Select Template</h1>
            <div class="flex flex-col p-3 justify-center">
                {templates.map((template) => {
                  return (
                    <div class="flex justify-center ">
                      <Link to={"/TemplateOptions/0/" + template.id}>
                        <div class="m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{template.TemplateName}</h5>
                        </div>
                      </Link>
                    </div>
                  )
                })}

            </div>
          </div>

          <div class="flex flex-row justify-center">
                <button type="button" class="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
                <div class="py-3 m-3">
                    <p>1/1</p>           
                </div>
                <button type="button" class="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Next</button>
                <button type="button" class="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Finish</button>
          </div>
        </div>

    );
  }
  export default Groups;
import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import TemplatesAPi from "../../API/TemplatesAPi";
import Back from "../../components/Back"

function Groups() {
  const { Sid } = useParams();
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
        <div className="">

          <div className="flex flex-col p-3">
            <h1 className="p-2 text-center text-4xl">Select Template</h1>
            <div className="flex flex-col p-3 justify-center">
                {templates.map((template) => {
                  return (
                    <div className="flex justify-center ">
                      <Link to={"/TemplateOptions/"+ Sid + "/" + template.id}>
                        <div className="m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{template.TemplateName}</h5>
                        </div>
                      </Link>
                    </div>
                  )
                })}

            </div>
          </div>

          <div className="flex flex-row justify-center">
                <button type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
                <div className="py-3 m-3">
                    <p>1/1</p>           
                </div>
                <button type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Next</button>
                <button type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Finish</button>
          </div>
        </div>

    );
  }
  export default Groups;
import { Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import TemplatesAPi from "../../API/TemplatesAPi";


function GroupOverview() {
    const { Sid, Tid } = useParams();
    const [template, setTemplate] = useState({});
    const navigate = useNavigate();

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

    console.log(template.Options)

    const handleToggleChange = (Option) => {
      setTemplate((prevTemplate) => {
        const updatedOptions = { ...prevTemplate.Options };
        updatedOptions[Option] = !updatedOptions[Option];
    
        console.log(Option + ": " + updatedOptions[Option]); 
    
        return {
          ...prevTemplate,
          Options: updatedOptions
        };
      });
    };

      return (
          <div class="">
            <div class="flex flex-col p-3 justify-center">
            <h1 class="p-2 text-center text-4xl">{template.TemplateName}</h1>
              <div class="flex flex-col p-3 justify-center">
                <div class="flex justify-center">
                <ul>
                    {Object.keys(template.Options || {}).map((key) => (
                        <button key={key} onClick={() => handleToggleChange(key)}>
                        <div class={"m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border " + (template.Options[key] == true ? 'bg-blue-600' : 'bg-white')}>
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{key}: {template.Options[key].toString()}</h5>
                        </div>
                      </button>
                    ))}
                </ul>
                <ul>
                    {Object.keys(template.Buttons || {}).map((key) => (
                        <Link key={key} to={"/" + key+ "/"+ Sid + "/" + Tid}>
                        <div class={"m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border "}>
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{key}</h5>
                        </div>
                      </Link>
                    ))}
                </ul>
                </div>   
              </div>
            </div>
  
            <div class="flex flex-row justify-center">  
                <button onClick={() => navigate(-1)} type="button" class="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
                <div class="py-3 m-3">
                    <p>1/1</p>           
                </div>
                <button type="button" class="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Next</button>
            </div>
        </div>
      );
    }
    export default GroupOverview;
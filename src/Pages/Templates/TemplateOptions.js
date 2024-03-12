import { Link, useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import TemplatesAPi from "../../API/TemplatesAPi";

function GroupOverview() {
    const { Sid, Qid } = useParams();
    const [template, setTemplate] = useState({});
    const navigate = useNavigate();

    const getTemplate = async () => {
      try {
        const templatesAPi = new TemplatesAPi();
        const result = templatesAPi.getGroupById();
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
          <div className="">
            <div className="flex flex-col p-3 justify-center">
            <h1 className="p-2 text-center text-4xl">{template.TemplateName}</h1>
              <div className="flex flex-col p-3 justify-center">
                <div className="flex  flex-col justify-center">
                    {Object.keys(template.Options || {}).map((key) => (
                        <button key={key} onClick={() => handleToggleChange(key)}>
                        <div className={"m-4 p-6 rounded-lg border-[#170699] border " + (template.Options[key] === true ? 'bg-[#170699] border-white' : 'bg-white')}>
                          <h5 className={"text-center mb-2 text-2xl font-bold tracking-tight " + (template.Options[key] === true ? 'text-white' : 'text-[#170699]')}>{key}: {template.Options[key].toString()}</h5>
                        </div>
                      </button>
                    ))}
                    {Object.keys(template.Buttons || {}).map((key) => (
                        <Link key={key} to={"/" + key+ "/"+ Sid + "/" + Qid}>
                          <h5 className="m-4 p-6 sm:w-fit  md:w-full font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">{key}</h5>
                      </Link>
                    ))}
                </div>   
              </div>
            </div>
  
            <div className="flex flex-row justify-center">  
                <button onClick={() => navigate(-1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
                <button onClick={() => navigate(-1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Create</button>
                <button onClick={() => navigate(-1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Edit</button>
                <button type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Next</button>
            </div>
        </div>
      );
    }
    export default GroupOverview;
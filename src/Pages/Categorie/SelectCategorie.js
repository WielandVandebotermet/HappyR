import { Link, useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryApi from "../../API/CategoryApi";
import Back from "../../components/Navigation/Back"

function SelectCategorie() {
    const { Sid, Qid } = useParams();
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
        const result = await CategoryApi.getAllCategorys();
        setCategories(result);
        } catch (error) {
        console.error('Error fetching groups:', error);
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

    return (
        <div className="">
          <div className="flex flex-col p-3">
            <h1 className="p-2 text-center text-4xl">categories</h1>
            <div className="flex flex-col p-3 justify-center">
                {categories.map((categorie) => {
                  return (
                    <div className="flex justify-center ">
                      <Link to={"/CreateCategorie/" + Sid + "/" + Qid+ "/" + categorie.id}>
                        <div className="m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                          <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{categorie.CategorieName}</h5>
                        </div>
                      </Link>
                    </div>
                  )
                })}
            </div>
          </div>

          <div className="flex flex-col">
              <div className="flex justify-center">
                <Link to={"/CreateCategorie/" + Sid + "/" + Qid+ "/" + 0} className="flex justify-center w-full">
                    <button type="button" className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium  text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Create Categorie</button>
                </Link>
              </div>
              <Back />
          </div>

        </div>
    );
  }
  export default SelectCategorie;
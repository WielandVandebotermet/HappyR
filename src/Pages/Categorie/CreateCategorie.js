import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryApi from "../../API/CategoryApi";
import Back from "../../components/Back"

function CreateCategorie() {
    const { Sid, Qid, Cid } = useParams();
    const [categorie, setCategorie] = useState([]);
    const [categorieName, setcategorieName] = useState('');
    const [categorieImpact, setcategorieImpact] = useState(100);

    const getCategorie = async () => {
        try {
            const result = await CategoryApi.getCategoryById(Cid);
            if (result) {
                setCategorie(result);
                setcategorieName(result.CategorieName || '');
                setcategorieImpact(result.Impact || 100);
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    }
    

    const handleDecimal = (value) => {
        if(value > 500){value = 500}
        if(value < 0){value = 0}
        if(value % 1 === 0){
            setcategorieImpact(value)
        }
        else {
            setcategorieImpact(Math.floor(value/1))
        }
      };

    useEffect(() => {
        getCategorie()
    }, []);

    return (
        <div className="">
           <h1 className={"p-2 text-center text-4xl " + (Cid !== "0" ? '' : 'hidden')}>{categorieName}</h1>
           <h1 className={"p-2 text-center text-4xl " + (Cid === "0" ? '' : 'hidden')}>Create Categorie</h1>
                <div className="flex justify-center">
                    <div className="flex flex-col justify-center sm:w-full md:w-1/3">
                        <div className="flex flex-col p-3">
                            <input className="border border-gray-900 rounded p-1 m-1" type="text" name="CategorieName" value={categorieName} onChange={(e) => setcategorieName(e.target.value)}></input>
                            <p className="text-right text-md">Categorie Name</p>
                        </div>
                        <div className="flex flex-col p-3">
                            <input className="border border-gray-900 rounded p-1 m-1" type="number" min={0} max={500} step={1} name="categorieImpact" value={categorieImpact} onChange={(e) => handleDecimal(e.target.value)}></input>
                            <p className="text-right text-md">Score Impact (%)</p>
                        </div>
                    </div>
                </div>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <Link to={"/TemplatePage/" + Sid+ "/"+ Qid} className={"w-1/2 flex justify-center " + (Cid === "0" ? 'hidden': 'block')}>
                  <button type="button" className={"py-3.5 mx-3 w-9/12 text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center"}>Select Categorie</button>
                </Link>
                <Link to={"/TemplatePage/" + Sid+ "/"+ Qid} className={"w-1/2 flex justify-center " + (Cid !== "0" ? 'hidden': 'Block')}>
                  <button type="button" className={"py-3.5 mx-3 w-9/12 text-base font-medium text-white bg-[#170699] hover:bg-blue-600 rounded-lg text-center"}>Create Categorie</button>
                </Link>
              </div>
            </div>
            <Back />
        </div>
    );
  }
  export default CreateCategorie;
import {  Link ,useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import NewSurveysApi from "../../API/NewSurveysApi";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TETextarea
} from "tw-elements-react";

function TemplatePage() {
  const { Sid, Qid } = useParams();
  const [question, setQuestion] = useState({});
  const [showModalTitle, setShowModalTitle] = useState(false);
  const [showModalSubText, setShowModalSubText] = useState(false);
  const [showModalBar, setShowModalBar] = useState(false);
  const navigate = useNavigate();

  const getQuestion = async () => {
    try {
      const surveysApi = new NewSurveysApi();
      const data = await surveysApi.getQuestionById(Sid, Qid);
      setQuestion(data.Question);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const ChangeQuestion = (value, id) => {
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      [id]: value
    }));
  };

  const Preview = () => {
    navigate("/TemplateShowcase/" + Sid + "/" + Qid);
  };

  useEffect(() => {
    getQuestion();
  }, []);

  if (!question) {
    return (<p>Loading...</p>);
  }

    return (
      <div>
        <div className="flex flex-col p-3 justify-center">
          <div className="flex justify-center">
            <button onClick={() => setShowModalTitle(true)} type="button" className="p-5 m-5 sm:w-fit  md:w-full font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Title</button>
          </div>
          <div className="flex justify-center">
            <button onClick={() => setShowModalSubText(true)} type="button" className="p-5 m-5 sm:w-fit  md:w-full font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Sub Text</button>
          </div>
          <div className="flex justify-center">
            <button onClick={() => setShowModalBar(true)} type="button" className="p-5 m-5 sm:w-fit  md:w-full font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">BarSettings</button>
          </div>
          <div className="flex flex-row justify-center">  
                  <button onClick={() => navigate(-1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
                  <button onClick={() => Preview()} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Preview</button>
              </div>
        </div>

        <TEModal show={showModalTitle} setShow={setShowModalTitle}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"> Title</h5>
              </TEModalHeader>
              <TEModalBody>
                    <div className="flex flex-col p-3 ">
                      <input className="border border-gray-900 rounded p-1 m-1" type="text" name="Title" value={question.Title} onChange={(e) => ChangeQuestion(e.target.value, "Title")}></input>
                      <p className="text-right text-md">Title</p>
                    </div>
              </TEModalBody>
              <TEModalFooter>
                  <div className="flow-root">
                    <button type="button" className="float-left inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200" onClick={() => setShowModalTitle(false)}> Close </button>
                    <button type="button" className="float-right ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"> Save changes </button>
                  </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
        <TEModal show={showModalSubText} setShow={setShowModalSubText}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"> Sub Text</h5>
              </TEModalHeader>
              <TEModalBody>
                    <div className="flex flex-col p-3 ">
                      <TETextarea  className="border border-gray-900 rounded p-1 m-1" type="text" name="SubText" value={question.SubText} onChange={(e) => ChangeQuestion(e.target.value, "SubText")}></TETextarea >
                      <p className="text-right text-md">Sub Text</p>
                    </div>
              </TEModalBody>
              <TEModalFooter>
                  <div className="flow-root">
                    <button type="button" className="float-left inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200" onClick={() => setShowModalSubText(false)}> Close </button>
                    <button type="button" className="float-right ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"> Save changes </button>
                  </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
        <TEModal show={showModalBar} setShow={setShowModalBar}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"> Bar Settings</h5>
              </TEModalHeader>
              <TEModalBody className="flex flex-col justify-center">
                    <div className="flex flex-row p-3 justify-center">
                      <p className="text-right text-md mt-1 pt-1">Bar Minimum: </p>
                      <input className="border border-gray-900 rounded p-1 m-1" min="0" type="number"  name="Bmin" value={question.Bmin} onChange={(e) => ChangeQuestion(e.target.value, "Bmin")}></input >
                    </div>
                    <div className="flex flex-row p-3 justify-center">
                      <p className="text-right text-md mt-1 pt-1">Bar Maximum: </p>
                      <input className="border border-gray-900 rounded p-1 m-1" min="0" type="number"  name="Bmax" value={question.Bmax} onChange={(e) => ChangeQuestion(e.target.value, "Bmax")}></input >
                    </div>
                    <div className="flex flex-row p-3 justify-center">
                      <p className="text-right text-md mt-1 pt-1 pl-10">Step size: </p>
                      <input className="border border-gray-900 rounded p-1 m-1" min="1" type="number"  name="Step" value={question.Step} onChange={(e) => ChangeQuestion(e.target.value, "Step")}></input >
                    </div>
                    <div className={"flex justify-center " + (question.CategorieId === 0 ? '' : 'hidden')}>
                      <Link to={"/SelectCategorie/" + Sid + "/" + Qid}>
                        <button type="button" className="p-3 m-1 mt-2 font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Categorie</button>
                      </Link>
                    </div>
                    <div className={"flex justify-center " + (question.CategorieId !== 0 ? '' : 'hidden')}>
                      <Link to={"/CreateCategorie/" + Sid + "/" + Qid+ "/" + question.CategorieId}>
                        <button type="button" className="p-3 m-1 mt-2 font-medium text-[#170699] border-[5px] border-[#170699] hover:bg-[#170699c0] hover:text-white rounded-lg text-center">Categorie</button>
                      </Link>
                    </div>
              </TEModalBody>
              <TEModalFooter>
                  <div className="flow-root">
                    <button type="button" className="float-left inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200" onClick={() => setShowModalBar(false)}> Close </button>
                    <button type="button" className="float-right ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"> Save changes </button>
                  </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div> 
    );
  }
  export default TemplatePage;
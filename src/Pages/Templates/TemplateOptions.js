import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TemplateApi from "../../API/TemplateApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";
import CategoryApi from "../../API/CategoryApi";
import Back from "../../components/Navigation/Back";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TETextarea,
} from "tw-elements-react";
import Question from "../../components/Templates/Question";

function TemplateOptions() {
  const { Sid, Qid, Tid } = useParams();
  const [question, setQuestion] = useState({});
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState(0);

  const [categorieName, setcategorieName] = useState("");
  const [categorieImpact, setcategorieImpact] = useState(100);
  const [settingsPage, setSettingsPage] = useState(true);
  const [optionsPage, setOptionsPage] = useState(false);
  const [SelectCategorie, setSelectCategorie] = useState(false);
  const [CreateCategorie, setCreateCategorie] = useState(false);
  const [showModalTitle, setShowModalTitle] = useState(false);
  const [showModalSubText, setShowModalSubText] = useState(false);
  const [showModalBar, setShowModalBar] = useState(false);
  const [categorieId, setCategorieId] = useState(false);
  const navigate = useNavigate();

  const getTemplate = async () => {
    try {
      const result = await TemplateApi.getTemplateById(Tid);
      setQuestion(result);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const getQuestion = async () => {
    try {
      const result = await SurveyQuestionApi.getSurveyQuestionById(Qid);
      setQuestion(result);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const getCategories = async () => {
    try {
      const result = await CategoryApi.getAllCategorys();
      setCategories(result);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const SaveOptions = async () => {
    try {
      const settings = [
        { text: question.Bmin, question: "Bmin" },
        { text: question.Bmax, question: "Bmax" },
        { text: question.Step, question: "Step" },
        { text: 0, question: "categorieId" },
      ];
      if (categorieId == null) {
        setOptionsPage(false);
        setSelectCategorie(true);
      } else {
        navigate("/CreateCategorie/" + Sid + "/" + Qid + "/" + categorieId);
      }
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  const EditOptions = async () => {
    try {
      const settings = [
        { text: question.Bmin, question: "Bmin" },
        { text: question.Bmax, question: "Bmax" },
        { text: question.Step, question: "Step" },
        { text: question.categorieId, question: "categorieId" },
      ];
      await SurveyQuestionApi.createeditSurveyQuestionSurveyQuestion(
        Qid,
        question.Title,
        question.SubText,
        question.options,
        settings
      );
      if (categorieId == null) {
        navigate("/SelectCategorie/" + Sid + "/" + Qid);
      } else {
        navigate("/CreateCategorie/" + Sid + "/" + Qid + "/" + categorieId);
      }
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  const Post = async () => {
    try {
      const settings = [
        { text: question.Bmin, question: "Bmin" },
        { text: question.Bmax, question: "Bmax" },
        { text: question.Step, question: "Step" },
        { text: categorie, question: "categorieId" },
      ];
      await SurveyQuestionApi.createSurveyQuestion(
        Sid,
        Tid,
        question.Title,
        question.SubText,
        question.options,
        settings
      );
      navigate(-1);
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  const getCategorie = async () => {
    try {
      const categorieSetting =
        question.settings &&
        question.settings.find((setting) => setting.question === "CategorieId");
      const Catid = categorieSetting ? categorieSetting.text : null;
      setCategorieId(Catid);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleDecimal = (value) => {
    if (value > 500) {
      value = 500;
    }
    if (value < 0) {
      value = 0;
    }
    if (value % 1 === 0) {
      setcategorieImpact(value);
    } else {
      setcategorieImpact(Math.floor(value / 1));
    }
  };

  useEffect(() => {
    if (Qid == 0) {
      getTemplate();
    } else {
      getQuestion();
    }
    getCategories();
  }, []);


  const handleCategorie = () => {
    setcategorieName(categories[categorie].category_name);
    setcategorieImpact(categories[categorie].score_impact);
  };

  useEffect(() => {
    if (question) {
      getCategorie();
    }
  }, [question]);

  const handleToggleChange = (optionId) => {
    setQuestion((prevQuestion) => {
      const updatedOptions = prevQuestion.options.map((option) => {
        if (option.id === optionId) {
          return {
            ...option,
            settingValue: !option.settingValue,
          };
        }
        return option;
      });

      return {
        ...prevQuestion,
        options: updatedOptions,
      };
    });
  };

  const ChangeQuestion = (value, id) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [id]: value,
    }));
  };

  if (!question.options || !categories) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-StrongBlue">
      <div className={"w-full " + (settingsPage ? "inline-block" : "hidden")}>
        <div className="flex flex-col p-3 justify-center">
          <h1 className="p-2 text-center text-4xl">
            {question.templateName || question.question}
          </h1>
          <div className="flex flex-col p-3 justify-center">
            <div className="flex  flex-col justify-center">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleToggleChange(option.id)}
                >
                  <div
                    className={
                      "m-4 p-6 rounded-lg border-StrongBlue  border " +
                      (option.settingValue === true
                        ? "bg-StrongBlue border-white"
                        : "bg-white")
                    }
                  >
                    <h5
                      className={
                        "text-center mb-2 text-2xl font-bold tracking-tight " +
                        (option.settingValue === true
                          ? "text-white"
                          : "text-StrongBlue")
                      }
                    >
                      {option.setting}: {option.settingValue.toString()}
                    </h5>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            Back
          </button>
          {
            <button
              onClick={() => {
                setSettingsPage(false);
                setOptionsPage(true);
              }}
              type="button"
              className={
                "py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center " +
                (Tid ? "inline-block" : "hidden")
              }
            >
              Next
            </button>
          }{" "}
        </div>
      </div>

      <div className={"w-full " + (optionsPage ? "inline-block" : "hidden")}>
        <div className="flex flex-col p-3 justify-center">
          <div className="flex justify-center">
            <button
              onClick={() => setShowModalTitle(true)}
              type="button"
              className="p-5 m-5 sm:w-fit  md:w-full font-medium  border-[5px] border-MineralGreen text-AccentRed bg-white hover:bg-MineralGreen01 rounded-lg text-center"
            >
              Title
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setShowModalSubText(true)}
              type="button"
              className="p-5 m-5 sm:w-fit  md:w-full font-medium border-[5px] border-MineralGreen text-AccentRed bg-white hover:bg-MineralGreen01 rounded-lg text-center"
            >
              Sub Text
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setShowModalBar(true)}
              type="button"
              className="p-5 m-5 sm:w-fit  md:w-full font-medium border-[5px] border-MineralGreen text-AccentRed bg-white hover:bg-MineralGreen01 rounded-lg text-center"
            >
              BarSettings
            </button>
          </div>
          <div className="flex flex-row justify-center">
            <button
              onClick={() => {
                setSettingsPage(true);
                setOptionsPage(false);
              }}
              type="button"
              className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
            >
              Back
            </button>
            <button
              onClick={() => navigate("/TemplateShowcase/")}
              type="button"
              className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
            >
              Preview
            </button>
            <button
              onClick={() => SaveOptions()}
              type="button"
              className={
                "py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center " +
                (Tid ? "inline-block" : "hidden")
              }
            >
              Save & Select Category
            </button>
            <button
              onClick={() => EditOptions()}
              type="button"
              className={
                "py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center " +
                (!Tid ? "inline-block" : "hidden")
              }
            >
              Edit & Edit Category
            </button>
          </div>
        </div>

        <TEModal show={showModalTitle} setShow={setShowModalTitle}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  {" "}
                  Title
                </h5>
              </TEModalHeader>
              <TEModalBody>
                <div className="flex flex-col p-3 ">
                  <input
                    className="border border-gray-900 rounded p-1 m-1"
                    type="text"
                    name="Title"
                    value={question.Title}
                    onChange={(e) => ChangeQuestion(e.target.value, "Title")}
                  ></input>
                  <p className="text-right text-md">Title</p>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div className="flow-root">
                  <button
                    type="button"
                    onClick={() => setShowModalTitle(false)}
                    className="float-right ml-1 inline-block rounded hover:bg-StrongBlueHover bg-StrongBlue text-AccentRed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {" "}
                    Close{" "}
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
        <TEModal show={showModalSubText} setShow={setShowModalSubText}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  {" "}
                  Sub Text
                </h5>
              </TEModalHeader>
              <TEModalBody>
                <div className="flex flex-col p-3 ">
                  <TETextarea
                    className="border border-gray-900 rounded p-1 m-1"
                    type="text"
                    name="SubText"
                    value={question.SubText}
                    onChange={(e) => ChangeQuestion(e.target.value, "SubText")}
                  ></TETextarea>
                  <p className="text-right text-md">Sub Text</p>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div className="flow-root">
                  <button
                    type="button"
                    onClick={() => setShowModalSubText(false)}
                    className="float-right ml-1 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-StrongBlueHover bg-StrongBlue text-AccentRed hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {" "}
                    Close{" "}
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
        <TEModal show={showModalBar} setShow={setShowModalBar}>
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  {" "}
                  Bar Settings
                </h5>
              </TEModalHeader>
              <TEModalBody className="flex flex-col justify-center">
                <div className="flex flex-row p-3 justify-center">
                  <p className="text-right text-md mt-1 pt-1">Bar Minimum: </p>
                  <input
                    className="border border-gray-900 rounded p-1 m-1"
                    min="0"
                    type="number"
                    name="Bmin"
                    value={question.Bmin}
                    onChange={(e) => ChangeQuestion(e.target.value, "Bmin")}
                  ></input>
                </div>
                <div className="flex flex-row p-3 justify-center">
                  <p className="text-right text-md mt-1 pt-1">Bar Maximum: </p>
                  <input
                    className="border border-gray-900 rounded p-1 m-1"
                    min="0"
                    type="number"
                    name="Bmax"
                    value={question.Bmax}
                    onChange={(e) => ChangeQuestion(e.target.value, "Bmax")}
                  ></input>
                </div>
                <div className="flex flex-row p-3 justify-center">
                  <p className="text-right text-md mt-1 pt-1 pl-10">
                    Step size:{" "}
                  </p>
                  <input
                    className="border border-gray-900 rounded p-1 m-1"
                    min="1"
                    type="number"
                    name="Step"
                    value={question.Step}
                    onChange={(e) => ChangeQuestion(e.target.value, "Step")}
                  ></input>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <div className="flow-root">
                  <button
                    onClick={() => setShowModalBar(false)}
                    type="button"
                    className="float-right ml-1 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-StrongBlueHover bg-StrongBlue text-AccentRed hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {" "}
                    Close{" "}
                  </button>
                </div>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>

      <div
        className={"w-full " + (SelectCategorie ? "inline-block" : "hidden")}
      >
        <div className="flex flex-col p-3">
          <h1 className="p-2 text-center text-4xl">Select Category</h1>
          <div className="flex flex-col p-3 justify-center">
            {categories.map((categorie) => {
              return (
                <div key={categorie.id} className="flex justify-center ">
                  <button
                    onClick={() => {
                      setCategorie(categorie.id);
                      setSelectCategorie(false);
                      setCreateCategorie(true);
                      handleCategorie();
                    }}
                  >
                    <div className="m-4 p-6 rounded-lg hover:text-MineralGreen border">
                      <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {categorie.categoryName}
                      </h5>
                      <p className="text-right text-sm">
                        Impact Score: {categorie.scoreImpact}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="flex justify-center w-full">
              <button
                onClick={() => {
                  setCategorie(0);
                  setSelectCategorie(false);
                  setCreateCategorie(true);
                }}
                type="button"
                className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] border-MineralGreen text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
              >
                Create Categorie
              </button>
            </div>
          </div>
          <div className="flex justify-center w-full pt-5">
          <button
            onClick={() => {
              setCategorie(0);
              setSelectCategorie(false);
              setOptionsPage(true);
            }}
            className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] border-MineralGreen text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
          >Back</button>
          </div>
        </div>
      </div>

      <div
        className={"w-full " + (CreateCategorie ? "inline-block" : "hidden")}
      >
        <div className="text-StrongBlue">
          <h1
            className={
              "p-2 text-center text-4xl " + (categorie !== "0" ? "" : "hidden")
            }
          >
            {categorieName}
          </h1>
          <h1
            className={
              "p-2 text-center text-4xl " + (categorie === "0" ? "" : "hidden")
            }
          >
            Create Categorie
          </h1>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center sm:w-full md:w-1/3">
              <div className="flex flex-col p-3">
                <input
                  className="border border-gray-900 rounded p-1 m-1"
                  type="text"
                  name="CategorieName"
                  value={categorieName}
                  onChange={(e) => setcategorieName(e.target.value)}
                ></input>
                <p className="text-right text-md">Categorie Name</p>
              </div>
              <div className="flex flex-col p-3">
                <input
                  className="border border-gray-900 rounded p-1 m-1"
                  type="number"
                  min={0}
                  max={500}
                  step={1}
                  name="categorieImpact"
                  value={categorieImpact}
                  onChange={(e) => handleDecimal(e.target.value)}
                ></input>
                <p className="text-right text-md">Score Impact (%)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center">
              <div
                to={"/SelectTemplate/" + Sid}
                className={
                  "w-1/2 flex justify-center " +
                  (categorie === "0" ? "hidden" : "block")
                }
              >
                <button
                  type="button"
                  className={
                    "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
                  }
                  onClick={() => {
                    Post()}}
                >
                  Use Category
                </button>
              </div>
              <Link
                to={"/SelectTemplate/" + Sid}
                className={
                  "w-1/2 flex justify-center " +
                  (categorie !== "0" ? "hidden" : "Block")
                }
              >
                <button
                  type="button"
                  className={
                    "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
                  }
                >
                  Create Category
                </button>
              </Link>
            </div>
          </div>
          <div className="pt-5 flex justify-center">
            <Link
              to={"/SelectCategorie/" + Sid + "/" + Qid}
              className={"w-1/2 flex justify-center "}
            >
              <button
                type="button"
                className={
                  "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
                }
              >
                Select Category
              </button>
            </Link>
          </div>
          <div className="flex justify-center w-full pt-5">
          <button
            onClick={() => {
              setCategorie(0);
              setSelectCategorie(true);
              setCreateCategorie(false);
            }}
            className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] border-MineralGreen text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
          >Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TemplateOptions;

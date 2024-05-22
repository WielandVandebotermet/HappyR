import { useState } from "react";
import { TETextarea } from "tw-elements-react";
import { useNavigate } from "react-router-dom";

import CategoryApi from "../../API/CategoryApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";

const NewQuestion = ({ Sid, templates, categories }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  const [templatePage, setTemplatePage] = useState(true);
  const [questionPage, setQuestionPage] = useState(false);
  const [selectCategoryPage, setSelectCategoryPage] = useState(false);
  const [editCategoryPage, setEditCategoryPage] = useState(false);

  const [selectedTemplateId, setSelectedTemplateId] = useState("-1");
  const [selectedTemplateName, setSelectedTemplateName] =
    useState("Choose Template");
  const [selectedTemplateOptions, setSelectedTemplateOptions] = useState([
    { id: 1, setting: "bar", settingValue: false },
    { id: 2, setting: "comment", settingValue: false },
  ]);

  const [categorieId, setCategorieId] = useState("-1");
  const [categorieName, setCategorieName] = useState("");
  const [categorieImpact, setCategorieImpact] = useState(100);

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionSubtext, setQuestionSubtext] = useState("");

  const [barMin, setBarMin] = useState(1);
  const [barMax, setBarMax] = useState(10);
  const [stepSize, setStepSize] = useState(1);

  const ChooseTemplate = (TemplateId, TemplateName, TemplateOptions) => {
    setSelectedTemplateId(TemplateId);
    setSelectedTemplateName(TemplateName);
    setSelectedTemplateOptions(TemplateOptions);

    setTemplatePage(false);
    setQuestionPage(true);
  };

  const BackToTemplates = () => {
    setQuestionTitle("");
    setQuestionSubtext("");
    setBarMax(10);
    setBarMin(1);
    setStepSize(1);

    setQuestionPage(false);
    setTemplatePage(true);
  };

  const BackToQuestion = () => {
    setSelectCategoryPage(false);
    setQuestionPage(true);
  };

  const BackToSelectCategory = () => {
    setEditCategoryPage(false);
    setSelectCategoryPage(true);
  };

  const NextToSelectCategorie = () => {
    if (
      barMin &&
      barMax &&
      stepSize &&
      barMin > 0 &&
      barMax > barMin &&
      barMax > stepSize &&
      stepSize > 0 &&
      questionTitle.trim() &&
      questionSubtext.trim()
    ) {
      const isAllFieldsFilled = () => {
        if (!questionTitle || !questionSubtext) return false;
        return true;
      };

      setQuestionPage(!isAllFieldsFilled());
      setSelectCategoryPage(isAllFieldsFilled());
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  const NextEditCategorie = () => {
    setSelectCategoryPage(false);
    setEditCategoryPage(true);
  };

  const Post = () => {
    if (categorieId == -1) {
      PostCatId0();
    } else {
      PostCatEdit();
    }
  };

  const PostCatId0 = async () => {
    if (
      categorieId &&
      categorieImpact &&
      categorieName.trim() &&
      categorieImpact > 0
    ) {
      try {
        let settings = [{ text: categorieId, question: "categorieId" }];

        if (selectedTemplateOptions[0].settingValue == true) {
          settings = [
            { text: barMin, question: "Bmin" },
            { text: barMax, question: "Bmax" },
            { text: stepSize, question: "Step" },
            { text: categorieId, question: "categorieId" },
          ];
        }

        await SurveyQuestionApi.createSurveyQuestionAndCategory(
          Sid,
          selectedTemplateId,
          questionTitle,
          questionSubtext,
          selectedTemplateOptions,
          settings,
          categorieName,
          parseInt(categorieImpact)
        );
        navigate(0);
      } catch (error) {
        console.error("Error adding group:", error.message);
      }
    } else {
      setErrorMessage(true);
    }
  };

  const PostCatEdit = async () => {
    if (
      categorieId &&
      categorieImpact &&
      categorieName.trim() &&
      categorieImpact > 0
    ) {
      try {
        let settings = [{ text: categorieId, question: "categorieId" }];

        if (selectedTemplateOptions[0].settingValue == true) {
          settings = [
            { text: barMin, question: "Bmin" },
            { text: barMax, question: "Bmax" },
            { text: stepSize, question: "Step" },
            { text: categorieId, question: "categorieId" },
          ];
        }
        await CategoryApi.editCategory(
          categorieId,
          categorieName,
          parseInt(categorieImpact)
        );

        await SurveyQuestionApi.createSurveyQuestion(
          Sid,
          selectedTemplateId,
          questionTitle,
          questionSubtext,
          selectedTemplateOptions,
          settings
        );
        navigate(0);
      } catch (error) {
        console.error("Error adding group:", error.message);
      }
    } else {
      setErrorMessage(true);
    }
  };

  if (!templates) {
    return <div>...Loading</div>;
  }

  return (
    <div className="text-StrongBlue">
      <div
        className={
          "flex flex-col p-3 justify-between" +
          (templatePage ? " inline-block" : " hidden")
        }
      >
        <h1 className="p-2 text-center text-4xl">Select Template</h1>
        {templates.map((template) => (
          <div className="flex justify-center" key={"template" + template.id}>
            <button
              onClick={() =>
                ChooseTemplate(
                  template.id,
                  template.templateName,
                  template.options
                )
              }
              className={`${
                template.templateName === "Comment" ? "cursor-not-allowed" : ""
              }`}
              disabled={template.templateName === "Question Comment"}
            >
              <div
                className={`m-4 p-6 rounded-lg border ${
                  template.templateName === "Comment"
                    ? "opacity-50 text-gray-400"
                    : "hover:border-MineralGreen01 hover:text-MineralGreen text-gray-900"
                }`}
              >
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight">
                  {template.templateName}
                </h5>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div
        className={
          "flex flex-col p-3 justify-between" +
          (questionPage ? " inline-block" : " hidden")
        }
      >
        <h1 className="p-2 mx-4 text-center text-4xl">
          {selectedTemplateName}
        </h1>
        {errorMessage && (
          <div className="text-danger-600 flex flex-col text-center text-lg font-bold mb-4">
            <p> Please fill in all forms.</p>
            <p> min must be greater than 0.</p>
            <p> max must be greater than min.</p>
            <p> StepSize must be smaller than max and bigger than 0.</p>
          </div>
        )}
        <div className="flex-col p-3">
          <div className="flex flex-col p-2">
            <input
              className="border border-gray-900 rounded p-1 m-1"
              type="text"
              name="questionTitle"
              label="Enter question Title here"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            ></input>
            <p className="text-left text-md">Title</p>
          </div>
          <div className="flex flex-col p-2">
            <TETextarea
              className="border border-gray-900 rounded p-1 m-1"
              type="text"
              name="questionSubtext"
              value={questionSubtext}
              onChange={(e) => setQuestionSubtext(e.target.value)}
            ></TETextarea>
            <p className="text-left text-md">Subtext</p>
          </div>

          <div
            className={
              "flex flex-col p-2 " +
              (selectedTemplateOptions[0].settingValue
                ? " inline-block"
                : " hidden")
            }
          >
            <div className="flex flex-col p-2">
              <input
                className="border border-gray-900 rounded p-1 m-1"
                type="text"
                name="barMin"
                label="Enter question Title here"
                value={barMin}
                onChange={(e) => setBarMin(e.target.value)}
              ></input>
              <p className="text-left text-md">Bar Minimum</p>
            </div>
            <div className="flex flex-col p-2">
              <input
                className="border border-gray-900 rounded p-1 m-1"
                type="text"
                name="barMax"
                label="Enter question Title here"
                value={barMax}
                onChange={(e) => setBarMax(e.target.value)}
              ></input>
              <p className="text-left text-md">Bar Maximum</p>
            </div>
            <div className="flex flex-col p-2">
              <input
                className="border border-gray-900 rounded p-1 m-1"
                type="text"
                name="stepSize"
                label="Enter question Title here"
                value={stepSize}
                onChange={(e) => setStepSize(e.target.value)}
              ></input>
              <p className="text-left text-md">Bar Step Size</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <button
            onClick={BackToTemplates}
            type="button"
            className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            Back
          </button>
          <button
            onClick={NextToSelectCategorie}
            type="button"
            className={
              "py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
            }
          >
            Next
          </button>
        </div>
      </div>

      <div
        className={"w-full " + (selectCategoryPage ? "inline-block" : "hidden")}
      >
        <div className="flex flex-col p-3">
          <h1 className="p-2 text-center text-4xl">Select Category</h1>
          <div className="flex flex-col p-3 justify-center">
            {categories.map((categorie) => {
              return (
                <div key={categorie.id} className="flex justify-center ">
                  <button
                    onClick={() => {
                      setCategorieId(categorie.id);
                      setCategorieName(categorie.categoryName);
                      setCategorieImpact(categorie.scoreImpact);
                      NextEditCategorie();
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
                  setCategorieId(-1);
                  setCategorieName("");
                  setCategorieImpact(100);
                  NextEditCategorie();
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
                BackToQuestion();
              }}
              className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] border-MineralGreen text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div
        className={"w-full " + (editCategoryPage ? "inline-block" : "hidden")}
      >
        <div className="text-StrongBlue">
          <h1
            className={
              "p-2 text-center text-4xl " +
              (categorieId !== Number(-1) ? "" : "hidden")
            }
          >
            {categorieName}
          </h1>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              {errorMessage && (
                <div className="text-danger-600 text-center text-lg font-bold mb-4">
                  Please fill in all forms
                </div>
              )}
              <div className="flex flex-col m-3">
                <input
                  className="border border-gray-900 rounded p-1 m-1"
                  type="text"
                  name="CategorieName"
                  value={categorieName || ""}
                  onChange={(e) => setCategorieName(e.target.value)}
                ></input>
                <p className="text-right text-md">Categorie Name</p>
              </div>
              <div className="flex flex-col m-3 pb-3">
                <input
                  className="border border-gray-900 rounded p-1 m-1"
                  type="number"
                  min={0}
                  max={500}
                  step={1}
                  name="categorieImpact"
                  value={categorieImpact || 0}
                  onChange={(e) => setCategorieImpact(e.target.value)}
                ></input>
                <p className="text-right text-md">Score Impact (%)</p>
              </div>
            </div>
          </div>

          <div className="pt-5 flex justify-center">
            <div
              className={
                "w-full flex justify-center " +
                (categorieId === Number(-1) ? "block " : "hidden")
              }
            >
              <button
                type="button"
                onClick={() => {
                  Post();
                }}
                className={
                  "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
                }
              >
                Create Category
              </button>
            </div>

            <div
              className={
                "w-full flex justify-center " +
                (categorieId !== Number(-1) ? "block " : "hidden")
              }
            >
              <button
                type="button"
                onClick={() => {
                  Post();
                }}
                className={
                  "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
                }
              >
                Use Category
              </button>
            </div>
          </div>
          <div className="flex justify-center w-full pt-5">
            <button
              onClick={() => {
                setCategorieId(-1);
                setCategorieName("");
                setCategorieImpact(100);

                setSelectCategoryPage(true);
                setEditCategoryPage(false);
              }}
              className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] border-MineralGreen text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;

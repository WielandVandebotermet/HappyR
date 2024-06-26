import { useState } from "react";
import { TETextarea } from "tw-elements-react";
import { useNavigate } from "react-router-dom";

import CategoryApi from "../../API/CategoryApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";

const NewQuestion = ({ Sid, templates, categories }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  // State variables for managing different pages
  const [templatePage, setTemplatePage] = useState(true);
  const [questionPage, setQuestionPage] = useState(false);
  const [selectCategoryPage, setSelectCategoryPage] = useState(false);
  const [editCategoryPage, setEditCategoryPage] = useState(false);

  // State variables for managing selected template and categories
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

  // State variables for question details
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionSubtext, setQuestionSubtext] = useState("");

  // State variables for bar settings
  const [barMin, setBarMin] = useState(1);
  const [barMax, setBarMax] = useState(10);
  const [stepSize, setStepSize] = useState(1);

  // Function to handle selecting a template
  const ChooseTemplate = (TemplateId, TemplateName, TemplateOptions) => {
    setSelectedTemplateId(TemplateId);
    setSelectedTemplateName(TemplateName);
    setSelectedTemplateOptions(TemplateOptions);

    setTemplatePage(false);
    setQuestionPage(true);
  };

  // Function to go back to template selection
  const BackToTemplates = () => {
    setQuestionTitle("");
    setQuestionSubtext("");
    setBarMax(10);
    setBarMin(1);
    setStepSize(1);

    setQuestionPage(false);
    setTemplatePage(true);
  };

  // Function to go back to question page
  const BackToQuestion = () => {
    setSelectCategoryPage(false);
    setQuestionPage(true);
  };

  // Function to go back to category selection page
  const BackToSelectCategory = () => {
    setEditCategoryPage(false);
    setSelectCategoryPage(true);
  };

  // Function to proceed to category selection page
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

  // Function to proceed to category editing page
  const NextEditCategorie = () => {
    setSelectCategoryPage(false);
    setEditCategoryPage(true);
  };

  // Function to handle posting new question
  const Post = () => {
    if (categorieId == -1) {
      PostCatId0();
    } else {
      PostCatEdit();
    }
  };

  // Function to post new question with category ID 0
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

  // Function to edit category and post new question
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
      {/* Template Selection Page */}
      <div
        className={
          "flex flex-col p-3 justify-between" +
          (templatePage ? " inline-block" : " hidden")
        }
      >
        <h1 className="p-2 text-center text-4xl">Select Template</h1>
        {/* Map through available templates */}
        {templates.map((template) => (
          <div className="flex justify-center" key={"template" + template.id}>
            {/* Template Selection Button */}
            <button
              onClick={() =>
                ChooseTemplate(
                  template.id,
                  template.templateName,
                  template.options
                )
              }
              // Disable button for "Comment" template
              className={`${
                template.templateName === "Comment" ? "cursor-not-allowed" : ""
              }`}
              disabled={template.templateName === "Question Comment"}
            >
              {/* Template Card */}
              <div
                className={`m-4 p-6 rounded-lg border ${
                  // Apply different styles for "Comment" template
                  template.templateName === "Comment"
                    ? "opacity-50 text-gray-400"
                    : "hover:border-MineralGreen01 hover:text-MineralGreen text-gray-900"
                }`}
              >
                {/* Template Name */}
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight">
                  {template.templateName}
                </h5>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Question Creation Page */}
      <div
        className={
          "flex flex-col p-3 justify-between" +
          (questionPage ? " inline-block" : " hidden")
        }
      >
        {/* Display Selected Template Name */}
        <h1 className="p-2 mx-4 text-center text-4xl">
          {selectedTemplateName}
        </h1>
        {/* Display Error Messages */}
        {errorMessage && (
          <div className="text-danger-600 flex flex-col text-center text-lg font-bold mb-4">
            <p> Please fill in all forms.</p>
            <p> min must be greater than 0.</p>
            <p> max must be greater than min.</p>
            <p> StepSize must be smaller than max and bigger than 0.</p>
          </div>
        )}
        {/* Form for Question Creation */}
        <div className="flex-col p-3">
          <div className="flex flex-col p-2">
            {/* Input for Question Title */}
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
            {/* Text Editor for Question Subtext */}
            <TETextarea
              className="border border-gray-900 rounded p-1 m-1"
              type="text"
              name="questionSubtext"
              value={questionSubtext}
              onChange={(e) => setQuestionSubtext(e.target.value)}
            ></TETextarea>
            <p className="text-left text-md">Subtext</p>
          </div>

          {/* Additional Options for Certain Templates */}
          <div
            className={
              "flex flex-col p-2 " +
              (selectedTemplateOptions[0].settingValue
                ? " inline-block"
                : " hidden")
            }
          >
            <div className="flex flex-col p-2">
              {/* Input for Bar Minimum */}
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
              {/* Input for Bar Maximum */}
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
              {/* Input for Bar Step Size */}
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
        {/* Navigation Buttons */}
        <div className="flex flex-row justify-center">
          {/* Back Button */}
          <button
            onClick={BackToTemplates}
            type="button"
            className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            Back
          </button>
          {/* Next Button */}
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
        {/* Page for Selecting Category */}
        <div className="flex flex-col p-3">
          <h1 className="p-2 text-center text-4xl">Select Category</h1>
          <div className="flex flex-col p-3 justify-center">
            {/* Mapping through available categories */}
            {categories.map((categorie) => {
              return (
                <div key={categorie.id} className="flex justify-center ">
                  {/* Button for selecting a category */}
                  <button
                    onClick={() => {
                      setCategorieId(categorie.id);
                      setCategorieName(categorie.categoryName);
                      setCategorieImpact(categorie.scoreImpact);
                      NextEditCategorie();
                    }}
                  >
                    {/* Category Card */}
                    <div className="m-4 p-6 rounded-lg hover:text-MineralGreen border">
                      {/* Category Name */}
                      <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {categorie.categoryName}
                      </h5>
                      {/* Impact Score */}
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

        {/* Buttons for Creating a New Category or Going Back */}
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="flex justify-center w-full">
              {/* Button for creating a new category */}
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
                Create Category
              </button>
            </div>
          </div>
          <div className="flex justify-center w-full pt-5">
            {/* Button to go back */}
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
        {/* Page for Editing Category */}
        <div className="text-StrongBlue">
          {/* Displaying Category Name if not a new category */}
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
              {/* Display error message if any */}
              {errorMessage && (
                <div className="text-danger-600 text-center text-lg font-bold mb-4">
                  Please fill in all forms
                </div>
              )}
              {/* Input field for category name */}
              <div className="flex flex-col m-3">
                <input
                  className="border border-gray-900 rounded p-1 m-1"
                  type="text"
                  name="CategorieName"
                  value={categorieName || ""}
                  onChange={(e) => setCategorieName(e.target.value)}
                ></input>
                <p className="text-right text-md">Category Name</p>
              </div>
              {/* Input field for category impact score */}
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

          {/* Buttons for creating or using category */}
          <div className="pt-5 flex justify-center">
            <div
              className={
                "w-full flex justify-center " +
                (categorieId === Number(-1) ? "block " : "hidden")
              }
            >
              {/* Button for creating a new category */}
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
              {/* Button for using the existing category */}
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
          {/* Button to go back */}
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

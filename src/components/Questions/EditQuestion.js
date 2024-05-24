import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TETextarea,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

import CategoryApi from "../../API/CategoryApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";

// Component for editing a question
const EditQuestion = ({ Sid, templates, categories, question }) => {
  // React hooks for managing state
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  // State variables for managing modal visibility and page navigation
  const [deleteModal, setDeleteModal] = useState(false);
  const [questionPage, setQuestionPage] = useState(true);
  const [selectCategoryPage, setSelectCategoryPage] = useState(false);
  const [editCategoryPage, setEditCategoryPage] = useState(false);

  // State variables for managing question details
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    question.templateId
  );
  const [selectedTemplateName, setSelectedTemplateName] = useState(
    question.templateName
  );
  const [selectedTemplateOptions, setSelectedTemplateOptions] = useState(
    question.options
  );
  const [questionTitle, setQuestionTitle] = useState(question.question);
  const [questionSubtext, setQuestionSubtext] = useState(question.text);

  // State variables for managing settings
  const [barMin, setBarMin] = useState(1);
  const [barMax, setBarMax] = useState(10);
  const [stepSize, setStepSize] = useState(1);

  // State variables for managing category details
  const [categorieId, setCategorieId] = useState("-1");
  const [categorieName, setCategorieName] = useState("");
  const [categorieImpact, setCategorieImpact] = useState(100);

  // Fetching initial data and setting initial state on component mount
  useEffect(() => {
    setCat();
    setSettings();
  }, [Sid]);

  // Function to set category details if available
  const setCat = () => {
    // Check if settings are available for category
    if (question.settings) {
      const setting = question.settings.find(
        (setting) => setting.question === "categorieId"
      );
      if (setting) {
        const categorie = categories.find(
          (categorie) => categorie.id === parseInt(setting.text)
        );
        if (categorie) {
          setCategorieId(categorie.id);
          setCategorieName(categorie.categoryName);
          setCategorieImpact(categorie.scoreImpact);
        }
      }
    }
  };

  // Function to set settings if available
  const setSettings = () => {
    if (selectedTemplateOptions[0].settingValue && question.settings) {
      const bmx = question.settings.find(
        (setting) => setting.question === "Bmax"
      );
      const bmn = question.settings.find(
        (setting) => setting.question === "Bmin"
      );
      const stepSizeSetting = question.settings.find(
        (setting) => setting.question === "Step"
      );
      if (bmx && bmn && stepSizeSetting) {
        setBarMax(bmx.text);
        setBarMin(bmn.text);
        setStepSize(stepSizeSetting.text);
      }
    }
  };

  // Function to navigate back to question editing page
  const BackToQuestion = () => {
    setEditCategoryPage(false);
    setSelectCategoryPage(false);
    setQuestionPage(true);
  };

  // Function to navigate back to category editing page
  const BackToEditCategory = () => {
    setSelectCategoryPage(false);
    setEditCategoryPage(true);
  };

  // Function to proceed to category editing page
  const NextToEditCategorie = () => {
    // Validation for required fields
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
      setSelectCategoryPage(false);
      setQuestionPage(false);
      setEditCategoryPage(true);
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  // Function to proceed to category selection page
  const NextToSelectCategorie = () => {
    setQuestionPage(false);
    setEditCategoryPage(false);
    setSelectCategoryPage(true);
  };

  // Function to handle submission of question details
  const Post = () => {
    if (categorieId === -1) {
      PostCatId0();
    } else {
      PutCatEdit();
    }
  };

  // Function to handle submission of category details when category ID is 0
  const PostCatId0 = async () => {
    if (
      categorieId &&
      categorieImpact &&
      categorieName.trim() &&
      categorieImpact > 0
    ) {
      try {
        let settings = [{ text: categorieId, question: "categorieId" }];
        if (selectedTemplateOptions[0].settingValue === true) {
          settings = [
            { text: barMin, question: "Bmin" },
            { text: barMax, question: "Bmax" },
            { text: stepSize, question: "Step" },
            { text: categorieId, question: "categorieId" },
          ];
        }

        await SurveyQuestionApi.editSurveyQuestionAndCategory(
          Sid,
          question.id,
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

  // Function to handle submission of category details when category ID is not 0
  const PutCatEdit = async () => {
    if (
      categorieId &&
      categorieImpact &&
      categorieName.trim() &&
      categorieImpact > 0
    ) {
      try {
        let settings = [{ text: categorieId, question: "categorieId" }];
        if (selectedTemplateOptions[0].settingValue === true) {
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

        await SurveyQuestionApi.editSurveyQuestion(
          Sid,
          question.id,
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

  // Function to delete the question
  const DeleteQuestion = async () => {
    try {
      await SurveyQuestionApi.deleteSurveyQuestion(question.id);
      navigate(0);
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };
  if (!templates) {
    // If templates are not yet loaded, show loading indicator
    return <div>...Loading</div>;
  }

  return (
    <div className="text-StrongBlue">
      {/* Main content */}
      <div
        className={
          "flex flex-col p-3 justify-between" +
          (questionPage ? " inline-block" : " hidden")
        }
      >
        {/* Question title */}
        <h1 className="p-2 mx-4 text-center text-4xl">
          {selectedTemplateName}
        </h1>
        {/* Error message */}
        {errorMessage && (
          <div className="text-danger-600 flex flex-col text-center text-lg font-bold mb-4">
            <p>Please fill in all forms.</p>
            <p>Min must be greater than 0.</p>
            <p>Max must be greater than min.</p>
            <p>StepSize must be smaller than max and bigger than 0.</p>
          </div>
        )}
        {/* Question input fields */}
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
          {/* Additional settings for certain template options */}
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
        {/* Buttons for actions */}
        <div className="flex flex-row justify-center">
          <button
            type="button"
            onClick={() => setDeleteModal(true)}
            className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            Delete
          </button>
          <button
            onClick={NextToEditCategorie}
            type="button"
            className={
              "py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete modal */}
      <TEModal show={deleteModal} setShow={setDeleteModal}>
        <TEModalDialog centered>
          <TEModalContent className="bg-[#ffffff]">
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-AccentRed">
                Delete {question.question}
              </h5>
            </TEModalHeader>
            <TEModalBody>
              <div className="flex flex-col p-3 text-StrongBlue">
                <p className="text-XL">
                  Are you sure you want to delete this user from{" "}
                  {question.question}?
                </p>
              </div>
            </TEModalBody>
            <TEModalFooter>
              <div className="flow-root">
                <button
                  type="button"
                  className="bg-StrongBlue02 hover:bg-StrongBlueHover text-white float-left inline-block rounded bg-gray-200 px-6 pb-2 pt-2.5 text-md leading-normal text-black hover:bg-gray-400 "
                  onClick={() => setDeleteModal(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="bg-AccentRed hover:bg-BGAccentRed text-white float-right ml-1 inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-md leading-normal hover:bg-red-800 "
                  onClick={() => {
                    setDeleteModal(false);
                    DeleteQuestion();
                  }}
                >
                  Delete
                </button>
              </div>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

      <div
        className={"w-full " + (editCategoryPage ? "inline-block" : "hidden")}
      >
        <div className="text-StrongBlue">
          <h1
            className={
              "p-2 text-center text-4xl " +
              (categorieId !== "-1" ? "" : "hidden")
            }
          >
            {categorieName}
          </h1>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              {/* Error message */}
              {errorMessage && (
                <div className="text-danger-600 text-center text-lg font-bold mb-4">
                  Please fill in all forms
                </div>
              )}
              <div className="flex flex-col m-3">
                {/* Input field for category name */}
                <input
                  className="border border-gray-900 rounded p-1 m-1"
                  type="text"
                  name="CategorieName"
                  value={categorieName || ""}
                  onChange={(e) => setCategorieName(e.target.value)}
                ></input>
                <p className="text-right text-md">Category Name</p>
              </div>
              <div className="flex flex-col m-3 pb-3">
                {/* Input field for score impact */}
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
                (categorieId === Number(-1) ? "block" : "hidden")
              }
            >
              {/* Button to create category */}
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
                (categorieId !== Number(-1) ? "block" : "hidden")
              }
            >
              {/* Button to use category */}
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
          {/* Button to go to category list */}
          <div className="flex justify-center w-full pt-5">
            <button
              onClick={() => {
                NextToSelectCategorie();
              }}
              className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] border-MineralGreen text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
            >
              Category List
            </button>
          </div>
        </div>
      </div>

      {/* Select category page */}
      <div
        className={"w-full " + (selectCategoryPage ? "inline-block" : "hidden")}
      >
        <div className="flex flex-col p-3">
          <h1 className="p-2 text-center text-4xl">Select Category</h1>
          <div className="flex flex-col p-3 justify-center">
            {/* Display available categories */}
            {categories.map((categorie) => {
              return (
                <div key={categorie.id} className="flex justify-center">
                  <button
                    onClick={() => {
                      setCategorieId(categorie.id);
                      setCategorieName(categorie.categoryName);
                      setCategorieImpact(categorie.scoreImpact);
                      BackToEditCategory();
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
              {/* Button to create new category */}
              <button
                onClick={() => {
                  setCategorieId(-1);
                  setCategorieName("");
                  setCategorieImpact(100);
                  NextToEditCategorie();
                }}
                type="button"
                className="py-3.5 mx-3 w-full max-w-screen-sm text-base font-medium border-[5px] border-MineralGreen text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
              >
                Create Category
              </button>
            </div>
          </div>
          {/* Button to go back */}
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
    </div>
  );
};

export default EditQuestion;

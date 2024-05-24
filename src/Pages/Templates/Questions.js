import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TemplateApi from "../../API/TemplateApi";
import CategoryApi from "../../API/CategoryApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";

import NewQuestion from "../../components/Questions/NewQuestion";
import EditQuestion from "../../components/Questions/EditQuestion";

function Questions() {
  // Extracting survey ID from URL parameters
  const { Sid } = useParams();

  // State variables to store survey data, templates, categories, and active question
  const [survey, setSurvey] = useState();
  const [templates, setTemplates] = useState();
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState("");

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Function to fetch survey data
  const getSurvey = async () => {
    try {
      const response = await SurveyQuestionApi.getSurveyById(Sid);
      setSurvey(response);
      const startDate = new Date(response.startDate);
      const month = startDate.toLocaleDateString("en-GB", { month: "long" });
      const day = startDate.getDate();
      setDate(month + " " + day);
      // Set the active question to the first question if available, otherwise to -1 indicating new question
      if (response.questions.length < 1) {
        setActiveQuestion("-1");
      } else {
        setActiveQuestion(response.questions[0].id);
      }
    } catch (error) {
      console.error("Error fetching survey:", error);
    }
  };

  // Function to fetch all categories
  const getCategories = async () => {
    try {
      const result = await CategoryApi.getAllCategorys();
      setCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch all templates
  const getTemplates = async () => {
    try {
      const result = await TemplateApi.getAllTemplates();
      setTemplates(result);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  // Function to handle toggling of active question
  const handleQuestionToggle = (questionId) => {
    if (Number(questionId) !== activeQuestion) {
      setActiveQuestion(Number(questionId));
    }
  };

  // Fetch survey data, categories, and templates on component mount
  useEffect(() => {
    getSurvey();
    getTemplates();
    getCategories();
  }, [Sid]);

  // Render loading message if survey data is not yet available
  if (!survey) {
    return <div>Please Select a survey!</div>;
  }

  // Render loading message if templates, categories, or survey questions data is not yet available
  if (!templates || !categories || !survey.questions) {
    return <div>... Loading!</div>;
  }

  // Render the Questions component
  return (
    <div className="max-h-full flex flex-col text-StrongBlue">
      <div className="flex-grow flex flex-col overflow-y-auto">
        <div className="flex flex-row items-center justify-between p-2 m-2">
          <div className="flex items-center">
            {/* Render back button */}
            <Link
              onClick={() => navigate(-1)}
              className="w-auto h-auto hover:text-MineralGreen"
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" size="3x" />
            </Link>
          </div>
          {/* Render survey date and name */}
          <h1 className="p-2 text-center text-4xl flex-grow">
            {date} | {survey.testName}
          </h1>
        </div>

        <div className="overflow-y-auto">
          <div className={"flex flex-wrap justify-center lg:hidden"}>
            {/* Dropdown for selecting questions on small screens */}
            <select
              value={activeQuestion}
              onChange={(e) => handleQuestionToggle(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              {/* Map through survey questions and render options */}
              {survey.questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.question}
                </option>
              ))}
              {/* Option to add new question */}
              <option value="-1">New Question</option>
            </select>
          </div>
          <div className={"flex justify-center"}>
            <div className={"flex-wrap justify-center hidden lg:inline-flex"}>
              {/* Render buttons for selecting questions on large screens */}
              {survey.questions.map((question) => (
                <h5
                  key={question.id}
                  className="mb-2 text-xl font-medium leading-tight pl-4 hover:text-MineralGreen"
                >
                  <button
                    className={
                      activeQuestion === question.id
                        ? "underline text-MineralGreen"
                        : "no-underline text-AccentRed"
                    }
                    onClick={() => handleQuestionToggle(question.id)}
                  >
                    {question.question}
                  </button>
                </h5>
              ))}
              {/* Button to add new question */}
              <h5 className="mb-2 text-xl font-medium leading-tight pl-4 hover:text-MineralGreen">
                <button
                  className={
                    activeQuestion === Number(-1)
                      ? "underline text-MineralGreen"
                      : "no-underline text-AccentRed"
                  }
                  onClick={() => handleQuestionToggle("-1")}
                >
                  New Question
                </button>
              </h5>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Render EditQuestion component for active question */}
            {survey.questions.map((question) => (
              <div key={question.id}>
                {activeQuestion === question.id && (
                  <EditQuestion
                    Sid={Sid}
                    templates={templates}
                    categories={categories}
                    question={question}
                  />
                )}
              </div>
            ))}
            {/* Render NewQuestion component if active question is -1 */}
            <div key={"-1"}>
              {activeQuestion === Number(-1) || activeQuestion === "-1"  && (
                <NewQuestion
                  Sid={Sid}
                  templates={templates}
                  categories={categories}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;

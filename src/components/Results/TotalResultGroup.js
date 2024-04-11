import { useEffect, useState } from "react";
import CategoryApi from "../../API/CategoryApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";


const TotalResultGroup = ({ result }) => {
  const [TotalResults, setTotalResults] = useState(0);
  const [TotalScoreList, setTotalScoreList] = useState({});
  const [QuestionScoreList, setQuestionScoreList] = useState({});

  console.log(result);

  const GetCategory = async (CategorieId) => {
    try {
      const response = await CategoryApi.getCategoryById(CategorieId);
      return response.categoryName;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const GetQuestion = async (questionId) => {
    try {
      const response = await SurveyQuestionApi.getSurveyQuestionById(questionId);
      return response.question;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    CalculateTotalResult();
    CalculateTotalScoreList();
    CalculateQuestionScoreList();
  }, [result]);

  const CalculateTotalResult = () => {
    let TR = 0;
    result.forEach((r) => {
      TR += r.totalResult;
    });
    setTotalResults(TR);
  };

  const CalculateTotalScoreList = async () => {
    let categoryScores = {};

    const promises = [];

    for (const r of result) {
      for (const item of r.scoreList) {
        const { categoryId, score } = item;
        promises.push(getCategoryScore(categoryId, score, categoryScores));
      }
    }

    await Promise.all(promises);
    console.log(categoryScores);
  };

  const getCategoryScore = async (categoryId, score, categoryScores) => {
    const categoryName = await GetCategory(categoryId);
    if (categoryName) {
      if (!categoryScores[categoryName]) {
        categoryScores[categoryName] = score;
      } else {
        categoryScores[categoryName] += score;
      }
    }
  };

  const CalculateQuestionScoreList = async () => {
    let questionScores = {};
  
    const promises = [];
  
    for (const r of result) {
      for (const item of r.scoreList) {
        const { questionId, score } = item;
        promises.push(getQuestionScore(questionId, score, questionScores));
      }
    }
    await Promise.all(promises);
    console.log(questionScores);
  };
  
  const getQuestionScore = async (questionId, score, questionScores) => {
    const questionText = await GetQuestion(questionId);
    if (questionText) {
      if (!questionScores[questionText]) {
        questionScores[questionText] = score;
      } else {
        questionScores[questionText] += score;
      }
    }
  };
  

  return (
    <div className="flex flex-col p-3 ">
      <p>HorizontalBar Total Scores/Max By People</p>
      <p>StackBar Total ListScores per Categorie/max By People</p>
      <p>StackBar Total score per question/max By People</p>
    </div>
  );
};
export default TotalResultGroup;

// Import necessary modules
import { useEffect, useState } from "react";
import CategoryApi from "../../API/CategoryApi";
import SurveyQuestionApi from "../../API/SurveyQuestionApi";
import UserApi from "../../API/UserApi";
import StackableBarChart from "./Graphs/StackableBarChart";
import BoxPlot from "./Graphs/BoxPlot";

// Define TotalResultGroup component
const TotalResultGroup = ({ result }) => {
  const [TotalResults, setTotalResults] = useState(0);
  const [MaxTotalResults, setMaxTotalResults] = useState(0);

  const [TotalScoreList, setTotalScoreList] = useState({});
  const [MaxTotalScoreList, setMaxTotalScoreList] = useState({});

  const [TotalQuestionScoreList, setTotalQuestionScoreList] = useState({});
  const [MaxQuestionScoreList, setMaxQuestionScoreList] = useState({});

  const [UserTotalResults, setUserTotalResults] = useState({});
  const [UserScoreList, setUserScoreList] = useState({});
  const [UserQuestionScoreList, setUserQuestionScoreList] = useState({});

  const [Loading, setLoading] = useState(false);

  // Fetch category name by category ID
  const getCategory = async (CategorieId) => {
    try {
      const response = await CategoryApi.getCategoryById(CategorieId);
      return response.categoryName;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Fetch question details by question ID
  const getQuestion = async (questionId) => {
    try {
      const response = await SurveyQuestionApi.getSurveyQuestionById(
        questionId
      );
      return response;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Fetch user details by user ID
  const getUser = async (userId) => {
    try {
      const response = await UserApi.getUserById(userId);
      return response.firstName + " " + response.lastName;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Effect hook to calculate various scores and results when 'result' changes
  useEffect(() => {
    CalculateTotalScoreList();
    CalculateMaxTotalScoreList();
    CalculateQuestionScoreList();
    CalculateMaxQuestionScoreListAndResult();
    CalculateTotalResult();
  }, [result]);

  // Effect hook to set loading state when various score lists change
  useEffect(() => {
    if (
      Object.keys(UserScoreList).length > 0 &&
      Object.keys(MaxTotalScoreList).length > 0 &&
      Object.keys(UserQuestionScoreList).length > 0 &&
      Object.keys(MaxQuestionScoreList).length > 0
    ) {
      setLoading(true);
    }
  }, [
    TotalResults,
    MaxTotalResults,
    TotalScoreList,
    MaxTotalScoreList,
    TotalQuestionScoreList,
    MaxQuestionScoreList,
    UserTotalResults,
    UserScoreList,
    UserQuestionScoreList,
  ]);

  // Function to calculate total results and user scores
  const CalculateTotalResult = async () => {
    let TR = 0;
    let TUserScores = {};
    let TUserScoreLists = {};
    let TUserQuestionLists = {};
    const promises = [];

    result.forEach((r) => {
      const promise = getUser(r.userId).then(async (userId) => {
        let categoryScores = {};
        let questionScores = {};

        TUserScores[userId] = r.totalResult;

        // Await the result of getUserScoreList
        const userScoreList = await getUserScoreList(
          r.scoreList,
          categoryScores
        );
        TUserScoreLists[userId] = userScoreList;

        // Similarly, await the result of getUserQuestionScore
        const userQuestionScoreList = await getUserQuestionScore(
          r.scoreList,
          questionScores
        );
        TUserQuestionLists[userId] = userQuestionScoreList;

        TR += r.totalResult;
      });
      promises.push(promise);
    });

    await Promise.all(promises);

    setTotalResults(TR);
    setUserTotalResults(TUserScores);
    setUserScoreList(TUserScoreLists);
    setUserQuestionScoreList(TUserQuestionLists);
  };

  // Function to get user score list based on categories
  const getUserScoreList = async (scoreList, categoryScores) => {
    for (const item of scoreList) {
      const { categoryId, score } = item;
      const categoryName = await getCategory(categoryId);
      if (categoryScores && categoryName) {
        if (!categoryScores[categoryName]) {
          categoryScores[categoryName] = score;
        } else {
          categoryScores[categoryName] += score;
        }
      }
    }
    return categoryScores;
  };

  // Function to get user question scores
  const getUserQuestionScore = async (scoreList, questionScores) => {
    for (const item of scoreList) {
      const { questionId, score } = item;
      const questionText = await getQuestion(questionId);
      const question = questionText.question;
      if (question) {
        if (!questionScores[question]) {
          questionScores[question] = score;
        } else {
          questionScores[question] += score;
        }
      }
    }
    return questionScores;
  };

  // Function to calculate total score list based on categories
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
    setTotalScoreList(categoryScores);
  };

  // Function to get category score
  const getCategoryScore = async (categoryId, score, categoryScores) => {
    const categoryName = await getCategory(categoryId);
    if (categoryName) {
      if (!categoryScores[categoryName]) {
        categoryScores[categoryName] = score;
      } else {
        categoryScores[categoryName] += score;
      }
    }
  };

  // Function to calculate maximum total score list
  const CalculateMaxTotalScoreList = async () => {
    let categoryScores = {};

    const promises = [];

    for (const item of result[0].scoreList) {
      const { questionId, categoryId } = item;
      promises.push(
        getMaxCategoryScore(categoryId, questionId, categoryScores)
      );
    }

    await Promise.all(promises);
    setMaxTotalScoreList(categoryScores);
  };

  // Function to get maximum category score
  const getMaxCategoryScore = async (
    categoryId,
    questionId,
    categoryScores
  ) => {
    const categoryName = await getCategory(categoryId);
    const questionText = await getQuestion(questionId);
    const BmaxObj = questionText.settings.find(
      (item) => item.question === "Bmax"
    );
    const Bmax = BmaxObj ? BmaxObj.text : undefined;
    if (categoryName) {
      if (!categoryScores[categoryName]) {
        categoryScores[categoryName] = parseInt(Bmax);
      } else {
        categoryScores[categoryName] += parseInt(Bmax);
      }
    }
  };

  // Function to calculate question score list
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
    setTotalQuestionScoreList(questionScores);
  };

  // Function to get question score
  const getQuestionScore = async (questionId, score, questionScores) => {
    try {
      const questionData = await getQuestion(questionId);
      if (questionData && questionData.question) {
        const questionText = questionData.question;
        if (!questionScores[questionText]) {
          questionScores[questionText] = score;
        } else {
          questionScores[questionText] += score;
        }
      } else {
        console.error("Invalid question data:", questionData);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Function to calculate maximum question score list and total maximum results
  const CalculateMaxQuestionScoreListAndResult = async () => {
    let questionScores = {};
    let MTR = 0;
    const promises = [];

    for (const item of result[0].scoreList) {
      const { questionId, score } = item;
      promises.push(getMaxQuestionScore(questionId, questionScores, MTR));
    }

    await Promise.all(promises);
    setMaxQuestionScoreList(questionScores);
    setMaxTotalResults(MTR);
  };

  // Function to get maximum question score
  const getMaxQuestionScore = async (questionId, questionScores, MTR) => {
    try {
      const questionData = await getQuestion(questionId);
      const BmaxObj = questionData.settings.find(
        (item) => item.question === "Bmax"
      );
      const Bmax = BmaxObj ? BmaxObj.text : undefined;
      if (questionData && questionData.question) {
        const questionText = questionData.question;
        if (!questionScores[questionText]) {
          questionScores[questionText] = parseInt(Bmax);
        } else {
          questionScores[questionText] += parseInt(Bmax);
        }
        MTR += parseInt(Bmax);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Function to calculate chart height based on window dimensions
  function getChartHeight() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const isLandscape = aspectRatio > 1.2; // Landscape if aspect ratio is greater than 1.2
    const baseHeight = isLandscape
      ? window.innerWidth * 0.5
      : window.innerHeight * 0.5;
    return baseHeight * 0.7;
  }

  // Function to determine if the window is in landscape mode
  function Landscape() {
    const isLandscape = window.innerWidth > window.innerHeight;
    return isLandscape;
  }

  // Function to get legend padding based on window orientation
  function getLegendPadding() {
    const isLandscape = window.innerWidth > window.innerHeight;
    return isLandscape ? 0 : 0;
  }

  // Render the loading state or the chart components
  if (!Loading) {
    return <div>...Loading</div>;
  } else {
    return (
      <div
        className={
          "flex flex-col" + (Landscape() === false ? " p-0 " : " p-0 ")
        }
      >
        <div className="flex flex-col flex-wrap justify-center">
          {/* Stackable Bar Chart for category scores */}
          <div className="flex overflow-auto justify-center">
            <StackableBarChart
              data={UserScoreList}
              maxValues={MaxTotalScoreList}
              title={"Category scores per person"}
              Width={800}
              Height={getChartHeight()}
              legendPadding={getLegendPadding()}
            />
          </div>

          {/* Stackable Bar Chart for question scores */}
          <div className="flex overflow-auto justify-center">
            <StackableBarChart
              data={UserQuestionScoreList}
              maxValues={MaxQuestionScoreList}
              title={"Question scores per person"}
              Width={800}
              Height={getChartHeight()}
              legendPadding={getLegendPadding()}
            />
          </div>

          {/* Box Plot for user scores */}
          <div className="flex overflow-auto justify-center">
            <BoxPlot
              data={UserScoreList}
              maxValues={MaxTotalScoreList}
              title={"BoxPlot"}
              Width={800}
              Height={200}
              legendPadding={getLegendPadding()}
            />
          </div>

          {/* Box Plot for question scores */}
          <div className="flex overflow-auto justify-center">
            <BoxPlot
              data={UserQuestionScoreList}
              maxValues={MaxQuestionScoreList}
              title={"BoxPlot"}
              Width={800}
              Height={200}
              legendPadding={getLegendPadding()}
            />
          </div>
        </div>
      </div>
    );
  }
};
export default TotalResultGroup;

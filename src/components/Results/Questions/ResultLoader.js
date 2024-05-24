// Import necessary modules
import { lazy, Suspense } from "react";

// Define ResultLoader component
const ResultLoader = ({ templateId, question, answer }) => {
  let ResultComponent;

  // Dynamically import ResultComponent based on templateId
  if (templateId === "1") {
    ResultComponent = lazy(() => import(`./ResultQuestion.js`));
  } else if (templateId === "2") {
    ResultComponent = lazy(() => import(`./ResultTeamQuestion.js`));
  } else if (templateId === "3") {
    ResultComponent = lazy(() => import(`./ResultComment.js`));
  }

  // Render ResultComponent inside Suspense for lazy loading
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultComponent question={question} answer={answer} />
    </Suspense>
  );
};

// Export ResultLoader component
export default ResultLoader;

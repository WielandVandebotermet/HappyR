import { lazy, Suspense } from "react";

const ResultLoader = ({ templateId, question, answer }) => {
  let ResultComponent;

  if (templateId === "1") {
    ResultComponent = lazy(() => import(`./ResultQuestion.js`));
  } else if (templateId === "2") {
    ResultComponent = lazy(() => import(`./ResultTeamQuestion.js`));
  } else if (templateId === "3") {
    ResultComponent = lazy(() => import(`./ResultComment.js`));
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultComponent question={question} answer={answer} />
    </Suspense>
  );
};
export default ResultLoader;

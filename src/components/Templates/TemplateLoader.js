import React, { lazy, Suspense } from "react";

const TemplateLoader = ({ templateId, question, HandleResult, q }) => {
  let TemplateComponent;

  // Dynamically load the appropriate template component based on templateId
  if (templateId === "1") {
    TemplateComponent = lazy(() => import(`../../components/Templates/Question.js`));
  } else if (templateId === "2") {
    TemplateComponent = lazy(() => import(`../../components/Templates/TeamQuestion.js`));
  } else if (templateId === "3") {
    TemplateComponent = lazy(() => import(`../../components/Templates/Comment.js`));
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Render the loaded template component, passing necessary props */}
      {TemplateComponent && (
        <TemplateComponent 
          question={question} 
          answer={(answer) => HandleResult(question.id, answer)} 
          key={q.id}
        />
      )}
    </Suspense>
  );
};

export default TemplateLoader;

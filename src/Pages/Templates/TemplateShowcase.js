import {  useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import NewSurveysApi from "../../API/NewSurveysApi";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { TETextarea } from "tw-elements-react";
function TemplateShowcase() {
  const { Sid, Qid } = useParams();
  const [question, setQuestion] = useState({});
  const [marks, setMarks] = useState({});
  const navigate = useNavigate();

  const getQuestion = async () => {
    try {
      const surveysApi = new NewSurveysApi();
      const data = await surveysApi.getQuestionById(Sid, Qid);
      if (data) {
        setQuestion(data);
      }
        const newMarks = {};
        for (let i = data.Question.Bmin; i <= data.Question.Bmax; i += data.Question.Step) {
          newMarks[i] = <p className="text-3xl">{i}</p>;
        }
        setMarks(newMarks);
        
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  }

  useEffect(() => {
    getQuestion();
  }, [Sid, Qid]);

  const title = question && question.Question && question.Question.Title;

  if (!question || !question.Question || !title) {
    return (<p>Loading...</p>);
  }

    return (
        <div className="flex flex-col justify-center">
          <div className="flex flex-col justify-center">
            <h1 className="p-2 text-center text-4xl">{question.Question.Title}</h1>
            <p className={"p-2 text-center text-xl " + (question.Options.subtext ? '' : 'hidden')}>{question.Question.SubText || 'hidden'}</p>
          </div>
          <div className="flex justify-center">
            <div className="flex pb-10 m-5 p-5 md:w-1/2 w-full justify-center">
              <Slider min={question.Question.Bmin} max={question.Question.Bmax} defaultValue={question.Question.Bmin} marks={marks} />
            </div>
          </div>
          <div className={"flex justify-center " + (question.Options.comment ? '' : 'hidden')}>
            <div className="flex flex-col p-3 justify-center md:w-1/2 w-full">
              <TETextarea  className="border h-32 border-gray-900 rounded p-1 m-1" type="text" name="comment"></TETextarea >
              <p className="text-right text-md">Comment</p>
            </div>
          </div>
          <div className="pt-4 flex flex-row justify-center">
            <button onClick={() => navigate(-1)} type="button" className="py-3.5 mx-3 w-1/3 max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
          </div>
        </div>
    );
  }
  export default TemplateShowcase;
import { useState, useEffect} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import isEqual from 'lodash/isEqual';

const Question = ({ question, answer }) => {
  const [SliderValue, SetSliderValue] = useState(0);
  const [marks, setMarks] = useState({});
  const [Bmin, setBmin] = useState(0);
  const [Bmax, setBmax] = useState(1);
  const [CategorieId, setCategorieId] = useState("0");
  
  useEffect(() => {
    const newMarks = {};
    let Bmin = 0, Bmax = 1;
    const Step = parseInt(question.settings.find(setting => setting.question === "Step")?.text || 1, 10);
    Bmin = parseInt(question.settings.find(setting => setting.question === "Bmin")?.text || 1, 10);
    Bmax = parseInt(question.settings.find(setting => setting.question === "Bmax")?.text || 1, 10);
    const Catid = parseInt(question.settings.find(setting => setting.question === "CategorieId")?.text || 1, 10);

    for (let i = Bmin; i <= Bmax; i += Step) {
      newMarks[i] = <p className="text-3xl pt-2">{i}</p>;
    }

    setMarks(newMarks);
    setBmin(Bmin);
    setBmax(Bmax);
    setCategorieId(Catid);
    SetSliderValue(Bmin);
  }, []);

  const handleResult = (value) => {
    SetSliderValue(value);
    answer({"questionId": question.id , "score": value, "categoryId": CategorieId });
  };

  return (
    <div className="flex flex-col p-3 ">
      <h1 className="p-2 text-center text-3xl">{question.question}</h1>
      <h1 className="p-2 text-center text-xl">{question.text}</h1>
      <div className="flex justify-center">
          <div className="flex pb-10 m-5 p-5 w-full justify-center">
            <Slider
              railStyle={{ backgroundColor: 'lightgray', height: '25px'}} 
              activeDotStyle={{ display: 'none'}} 
              dotStyle={{ display: 'none' }} 
              trackStyle={{ backgroundColor: '#001466', height: '25px' }} 
              handleStyle={{
                backgroundColor: '#001466',
                borderColor: '#001466',
                width: '30px',
                height: '30px',
                marginTop: '-2.5px',
              }} 
              min={Bmin}
              max={Bmax}
              value={SliderValue}
              onChange={(value) => handleResult(value)}
              marks={marks}
            />
          </div>
        </div>
  </div>
  );
};

export default Question;

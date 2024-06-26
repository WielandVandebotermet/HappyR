// Import necessary modules
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { TETooltip } from "tw-elements-react";

// Define ResultQuestion component
const ResultQuestion = ({ question, answer }) => {
  // Define state variables
  const [SliderValue, SetSliderValue] = useState(0);
  const [marks, setMarks] = useState({});
  const [Bmin, setBmin] = useState(0);
  const [Bmax, setBmax] = useState(1);
  const [CategorieId, setCategorieId] = useState("0");

  // Fetch question settings and set state variables accordingly
  useEffect(() => {
    const newMarks = {};
    let Bmin = 0,
      Bmax = 1;
    const Step = parseInt(
      question.settings.find((setting) => setting.question === "Step")?.text ||
        1,
      10
    );
    Bmin = parseInt(
      question.settings.find((setting) => setting.question === "Bmin")?.text ||
        1,
      10
    );
    Bmax = parseInt(
      question.settings.find((setting) => setting.question === "Bmax")?.text ||
        1,
      10
    );
    const Catid = parseInt(
      question.settings.find((setting) => setting.question === "CategorieId")
        ?.text || 1,
      10
    );

    for (let i = Bmin; i <= Bmax; i += Step) {
      newMarks[i] = <p className="text-3xl pt-2">{i}</p>;
    }

    setMarks(newMarks);
    setBmin(Bmin);
    setBmax(Bmax);
    setCategorieId(Catid);
    SetSliderValue(answer.score);
  }, []);

  // Handle slider value change
  const handleResult = (value) => {
    SetSliderValue(value);
    answer({ questionId: question.id, score: value, categoryId: CategorieId });
  };

  // Render ResultQuestion component
  return (
    <div className="h-full w-full">
      <div className="flex flex-col p-3">
        <TETooltip
          tag="a"
          title={question.text}
          wrapperProps={{ href: "#" }}
          className="p-2 text-center text-xl text-AccentRed hover:text-MineralGreen transition duration-150 ease-in-out  focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 pointer-events-auto cursor-pointer"
        >
          {question.question}
        </TETooltip>
        <div className="flex justify-center">
          <div className="flex pb-2 m-2 p-2 w-full justify-center bg-white">
            <Slider
              railStyle={{ backgroundColor: "lightgray", height: "25px" }}
              activeDotStyle={{ display: "none" }}
              dotStyle={{ display: "none" }}
              trackStyle={{ backgroundColor: "#66CCC3", height: "25px" }}
              handleStyle={{
                backgroundColor: "#66CCC3",
                borderColor: "#66CCC3",
                width: "30px",
                height: "30px",
                marginTop: "-2.5px",
              }}
              disabled={true}
              min={Bmin}
              max={Bmax}
              value={SliderValue}
              marks={marks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export ResultQuestion component
export default ResultQuestion;

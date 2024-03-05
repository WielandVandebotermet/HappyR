import { NavLink} from "react-router-dom";

function Results() {
    return (
      <div class=" min-h-screen">
        <div class="flex flex-col p-3 justify-center">
          <h1 class="p-2 text-center text-4xl">Surveys</h1>
          <div class="flex flex-col justify-center p-3">
            <div class="flex justify-center">
              <NavLink to="/">
                <div class="block max-w-sm m-4 p-6 rounded-lg border-gray-900  hover:border-blue-600 border">
                  <div class="">
                  <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Date | SurveyName</h5>
                  </div>
                  <div class="flow-root">
                    <p class="float-right text-sm">Group</p>
                    <p class="float-left text-sm">XX/XX Answerd</p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>


        <div class="flex flex-col justify-center">
        <NavLink to="/">
          <div class="flex justify-center">
            <button type="button" class="py-3.5 my-7 mx-3 w-full max-w-screen-sm text-base font-medium text-white bg-[#170699] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Back</button>
          </div>
        </NavLink>
      </div>
    </div>
    );
  }
  export default Results;
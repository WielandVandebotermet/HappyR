import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SurveyApi from "../../API/SurveyApi";
import GroupApi from "../../API/GroupApi";
import Back from "../../components/Navigation/Back";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

function CreateSurveys() {
  const [errorMessage, setErrorMessage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [GroupPage, setGroupPage] = useState(false);
  const [groups, setGroups] = useState([]);
  const [Selectedgroups, setSelectedgroups] = useState([]);
  const [SurveyName, setSurveyName] = useState("");
  const [started, setStarted] = useState(false);
  const [MinDate, setMinDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  });

  const [date, setDate] = useState(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const getSurveys = async () => {
    if (id !== "0") {
      try {
        const response = await SurveyApi.getSurveyById(id);
        setSurveyName(response.testName);
        setStarted(response.started);

        const dateConvert = new Date(response.startDate);
        const year = dateConvert.getFullYear();
        const month = (dateConvert.getMonth() + 1).toString().padStart(2, "0");
        const day = dateConvert.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);
        setSelectedgroups(response.groupList);
      } catch (error) {
        console.error("Error fetching surveys:", error.message);
      }
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await GroupApi.getAllTeams();
      setGroups(response);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  const handleToggleChange = (groupId) => {
    setSelectedgroups((prevSelectedGroups) => {
      if (prevSelectedGroups.includes(groupId)) {
        return prevSelectedGroups.filter((id) => id !== groupId);
      } else {
        return [...prevSelectedGroups, groupId];
      }
    });
  };

  const createSurvey = async () => {
    if (SurveyName.trim() && date.trim() && Selectedgroups.length > 0) {
      try {
        await SurveyApi.createSurvey(
          SurveyName,
          date,
          null,
          Selectedgroups,
          false
        );

        navigate(-1);
      } catch (error) {
        console.error("Error adding group:", error.message);
      }
    } else {
      setErrorMessage(true);
    }
  };

  const EditSurvey = async () => {
    try {
      await SurveyApi.editSurvey(
        id,
        SurveyName,
        date,
        null,
        Selectedgroups,
        false
      );
      navigate(-1);
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  const DeleteSurvey = async () => {
    try {
      SurveyApi.deleteSurvey(id);
      navigate(-1);
    } catch (error) {
      console.error("Error adding group:", error.message);
    }
  };

  useEffect(() => {
    getSurveys();
    fetchGroups();
  }, []);

  return (
    <div>
      <div className={"text-StrongBlue " + (GroupPage ? "hidden" : "block")}>
        <div className="flex flex-col p-3">
          <h1
            className={
              "p-2 text-center text-4xl " + (id !== "0" ? "block" : "hidden")
            }
          >
            {SurveyName}
          </h1>
          <h1
            className={
              "p-2 text-center text-4xl " + (id === "0" ? "block" : "hidden")
            }
          >
            Create new survey
          </h1>
          {errorMessage && (
            <div className="text-danger-600 text-center text-lg font-bold mb-4">
              Please fill in all forms
            </div>
          )}
          <div className="flex justify-center">
            <div className="w-full md:w-1/3 md:flex flex-col">
              <div className="flex flex-col p-3">
                <input
                  className="border rounded p-1 m-1"
                  type="text"
                  name="groupName"
                  label="Enter group name here"
                  value={SurveyName}
                  onChange={(e) => setSurveyName(e.target.value)}
                ></input>
                <p className="text-right text-md">Survey name</p>
              </div>
              <div className="flex flex-col p-3 ">
                <input
                  className="border rounded p-1 m-1"
                  aria-label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={MinDate}
                />
                <p className="text-right text-md">Date</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="w-1/2 flex justify-center">
              <button
                onClick={() => setGroupPage(!GroupPage)}
                type="button"
                className="py-3.5 my-5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
              >
                Select Group(s)
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center">
              <div
                className={
                  "w-1/2 flex justify-center " +
                  (id !== "0" ? "hidden" : "block")
                }
              >
                <button
                  onClick={() => createSurvey()}
                  type="button"
                  className={
                    "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01rounded-lg text-center"
                  }
                >
                  Create Survey
                </button>
              </div>
              <Link
                to={"/Questions/" + id}
                className={
                  "w-1/2 flex justify-center " +
                  (id === "0" || started ? "hidden" : "Block")
                }
              >
                <button
                  type="button"
                  className={
                    "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center "
                  }
                  disabled={started}
                >
                  Questions
                </button>
              </Link>
              {started && (
                <div className="text-danger-600 flex flex-col text-center text-lg font-bold">
                  <p> Survey has started</p>
                </div>
              )}
            </div>
            <div className="flex justify-center pt-4">
              <div
                className={
                  "w-1/2 flex justify-center " +
                  (id !== "0" ? "block" : "hidden")
                }
              >
                <button
                  onClick={() => setShowModalDelete(true)}
                  type="button"
                  className={
                    "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
                  }
                >
                  Delete Survey
                </button>
                <button
                  onClick={() => EditSurvey()}
                  type="button"
                  className={
                    "py-3.5 mx-3 w-9/12 text-base font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 rounded-lg text-center"
                  }
                >
                  Edit Survey
                </button>
              </div>
            </div>
          </div>
          <Back />
        </div>
      </div>

      <div className={"text-StrongBlue " + (GroupPage ? "block" : "hidden")}>
        <div className="flex flex-col p-3">
          <h1 className="p-2 text-center text-4xl">Select Groups</h1>
          <div className="flex flex-col justify-center">
            {groups.map((group) => {
              return (
                <div key={group.id} className="flex  justify-center">
                  <button onClick={() => handleToggleChange(group.id)}>
                    <div
                      className={
                        "flex-grow m-2 p-5 rounded-lg hover:text-MineralGreen border w-full max-w-64 " +
                        (Selectedgroups.includes(group.id)
                          ? "bg-StrongBlueHover"
                          : "bg-white")
                      }
                    >
                      <h5 className="text-center text-2xl font-bold tracking-tight">
                        {group.groupName}
                      </h5>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-1/2">
            <button
              onClick={() => setGroupPage(!GroupPage)}
              type="button"
              className="py-3.5 my-7 mx-3 w-full font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 hover:underline rounded-lg text-center"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <TEModal show={showModalDelete} setShow={setShowModalDelete}>
        <TEModalDialog centered>
          <TEModalContent className="text-StrongBlue">
            <TEModalHeader>
              <h5 className="text-AccentRed text-xl font-medium leading-normal">
                Delete {SurveyName}?
              </h5>
            </TEModalHeader>
            <TEModalBody>
              <div className="flex flex-col p-3 ">
                <p className="text-XL">
                  Are you sure you want to delete this survey: "{SurveyName}"?
                </p>
              </div>
            </TEModalBody>
            <TEModalFooter>
              <div className="flow-root">
                <button
                  type="button"
                  className="text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 float-left inline-block rounded bg-gray-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-gray-400 "
                  onClick={() => setShowModalDelete(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="text-StrongBlue bg-AccentRed hover:bg-BGAccentRed float-right ml-1 inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal hover:bg-red-800 "
                  onClick={() => {
                    setShowModalDelete(false);
                    DeleteSurvey();
                  }}
                >
                  Yes
                </button>
              </div>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
export default CreateSurveys;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import Cookies from "js-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { subscribeToPushNotifications } from "./components/Notifications/subscribeToPushNotifications";

import NavBar from "./components/Nav&Footer/NavBar";
import Footer from "./components/Nav&Footer/Footer";

import Home from "./Pages/Home";
import Profile from "./Pages/Login/Profile";
import Login from "./Pages/Login/Login";
import Results from "./Pages/Results/Results";
import ResultOverview from "./Pages/Results/ResultOverview";
import Groups from "./Pages/Groups/Groups";
import GroupOverview from "./Pages/Groups/GroupOverview";
import AddToGroup from "./Pages/Groups/AddToGroup";
import SelectTemplate from "./Pages/Templates/SelectTemplate";
import TemplateOptions from "./Pages/Templates/TemplateOptions";
import ExternalPeople from "./Pages/Templates/ExternalPeople";
import TemplateShowcase from "./Pages/Templates/TemplateShowcase";
import SelectCategorie from "./Pages/Categorie/SelectCategorie";
import CreateCategorie from "./Pages/Categorie/CreateCategorie";
import Test from "./Pages/Test/Test";
import Surveys from "./Pages/Surveys/Surveys";
import NewSurveys from "./Pages/Surveys/NewSurveys";
import CreateSurvey from "./Pages/Surveys/CreateSurvey";

function Main() {
  return (
    <div className="content">
      <Routes>
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/Profile"} element={<Profile />} />
        <Route path={"/Groups"} element={<Groups />} />
        <Route path={"/GroupOverview/:id"} element={<GroupOverview />} />
        <Route path={"/AddToGroup/:id"} element={<AddToGroup />} />
        <Route path={"/Surveys"} element={<Surveys />} />
        <Route path={"/NewSurveys"} element={<NewSurveys />} />
        <Route path={"/CreateSurvey/:id"} element={<CreateSurvey />} />
        <Route path={"/SelectTemplate/:Sid"} element={<SelectTemplate />} />
        <Route
          path={"/TemplateOptions/:Sid/:Qid/:Tid?"}
          element={<TemplateOptions />}
        />
        <Route
          path={"/ExternalPeople/:Sid/:Qid/:Tid?"}
          element={<ExternalPeople />}
        />
        <Route path={"/TemplateShowcase/"} element={<TemplateShowcase />} />
        <Route path={"/Test/:Sid/:Gid"} element={<Test />} />
        <Route
          path={"/SelectCategorie/:Sid/:Qid/"}
          element={<SelectCategorie />}
        />
        <Route
          path={"/CreateCategorie/:Sid/:Qid/:Cid"}
          element={<CreateCategorie />}
        />
        <Route path={"/Results"} element={<Results />} />
        <Route path={"/ResultOverview/:Sid/"} element={<ResultOverview />} />
      </Routes>
    </div>
  );
}

function App() {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const [userId, setUserId] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_AUTH;

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isLoading) {
        if (!isAuthenticated) return loginWithRedirect();

        // Fetch Auth0 user ID
        const auth0UserId = user?.sub;

        // Call backend to get external user ID
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await axios.get(`${API_URL}Auth/${auth0UserId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.status === 200) {
            const UserId = response.data.id;
            // Store external user ID in cookies
            Cookies.set("UserId", UserId);
            Cookies.set("access_token", accessToken);
            setUserId(UserId);

            subscribeToPushNotifications();
          } else {
            console.error(
              "Failed to fetch external user ID:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching external user ID:", error);
        }
      }
    };

    checkAuthentication();
  }, [
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  ]);



  return (
    <div className="relative min-h-screen">
      <BrowserRouter>
        <NavBar />
        <Main />
        <div className="pt-24">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

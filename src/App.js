import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
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

import Questions from "./Pages/Templates/Questions";

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
        <Route path={"/Questions/:Sid"} element={<Questions />} />
        <Route path={"/Test/:Sid/:Gid"} element={<Test />} />
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


  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_AUTH;

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
            localStorage.setItem('UserId', UserId);
            localStorage.setItem('access_token', accessToken);

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

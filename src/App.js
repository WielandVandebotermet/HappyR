// Importing necessary dependencies from React Router DOM
import { Routes, Route, BrowserRouter } from "react-router-dom";
// Importing the useEffect hook from React
import { useEffect } from "react";
// Importing React from React library
import React from "react";
// Importing the useAuth0 hook from Auth0 React SDK
import { useAuth0 } from "@auth0/auth0-react";
// Importing axios for making HTTP requests
import axios from "axios";

// Importing function for subscribing to push notifications
import { subscribeToPushNotifications } from "./components/Notifications/subscribeToPushNotifications";

// Importing components
import NavBar from "./components/Nav&Footer/NavBar";
import Footer from "./components/Nav&Footer/Footer";

// Importing page components
import Home from "./Pages/Home";
import Profile from "./Pages/Login/Profile";
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

// Main component for rendering routes
function Main() {
  return (
    <div className="content">
      {/* Defining routes for different pages */}
      <Routes>
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

// Main App component
function App() {
  // Destructuring necessary values from useAuth0 hook
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  // useEffect hook to manage authentication flow and user data retrieval
  useEffect(() => {
    // Function to check authentication status and fetch user data
    const checkAuthentication = async () => {
      if (!isLoading) {
        // Redirect to login page if user is not authenticated
        if (!isAuthenticated) return loginWithRedirect();

        // Fetch Auth0 user ID
        const auth0UserId = user?.sub;

        // Call backend to get external user ID
        try {
          // Get access token
          const accessToken = await getAccessTokenSilently();
          // Make request to backend API
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_AUTH}Auth/${auth0UserId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          // If successful response, store user ID in local storage and subscribe to push notifications
          if (response.status === 200) {
            const UserId = response.data.id;
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

    // Call the function
    checkAuthentication();
  }, [
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  ]);

  // Return JSX
  return (
    <div className="relative min-h-screen">
      <BrowserRouter>
        <NavBar />
        {/* Rendering main content */}
        <Main />
        <div className="pt-24">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

// Exporting the App component as the default export
export default App;

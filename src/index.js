// Importing necessary dependencies from React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Importing CSS file for styling
import "./index.css";

// Importing the root component of the application
import App from "./App";

// Importing function for reporting web vitals
import reportWebVitals from "./reportWebVitals";

// Importing Auth0Provider for authentication
import { Auth0Provider } from "@auth0/auth0-react";

// Importing Firebase dependencies for push notifications
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Importing FontAwesome dependencies for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faArrowLeft);

// Creating a root for React to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Setting up Auth0 configuration
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const autorize = process.env.REACT_APP_AUTH0_AUDIENCE;

// Initializing Firebase app
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBOFv9soUJfczljNmQnHadXiXKryhz5M-8",
  authDomain: "happyr-32a1e.firebaseapp.com",
  projectId: "happyr-32a1e",
  storageBucket: "happyr-32a1e.appspot.com",
  messagingSenderId: "173610922189",
  appId: "1:173610922189:web:89d167a9c725005e5cf984",
  measurementId: "G-2PM2MEJ3QN",
});

// Getting messaging instance for Firebase
const messaging = getMessaging(firebaseApp);

// Handling incoming messages for push notifications
onMessage(messaging, (payload) => {
  // Extracting notification title and body from payload
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };
  // Displaying notification
  const notification = new Notification(notificationTitle, notificationOptions);
});

// Rendering the application within Auth0Provider
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: autorize,
    }}
  >
    <App />
  </Auth0Provider>
);

// Reporting web vitals to measure performance
reportWebVitals();

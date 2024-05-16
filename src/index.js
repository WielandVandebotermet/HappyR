import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faArrowLeft);

const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const autorize = process.env.REACT_APP_AUTH0_AUDIENCE;

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBOFv9soUJfczljNmQnHadXiXKryhz5M-8",
    authDomain: "happyr-32a1e.firebaseapp.com",
    projectId: "happyr-32a1e",
    storageBucket: "happyr-32a1e.appspot.com",
    messagingSenderId: "173610922189",
    appId: "1:173610922189:web:89d167a9c725005e5cf984",
    measurementId: "G-2PM2MEJ3QN"
  });

  const messaging = getMessaging(firebaseApp);

  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log("payload", payload)
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };

        window.registration.showNotification(notificationTitle,
          notificationOptions);
          
          resolve(payload);
      });
    });

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: autorize
    }}
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

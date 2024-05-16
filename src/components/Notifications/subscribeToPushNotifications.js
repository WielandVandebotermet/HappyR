import Cookies from "js-cookie";
import { sendSubscriptionToServer } from "./sendSubscriptionToServer";
import { getMessaging, getToken } from "firebase/messaging";

export function subscribeToPushNotifications() {
    const applicationServerKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: applicationServerKey }).then((currentToken) => {
      console.log(currentToken);
      if (currentToken) {
        sendSubscriptionToServer(currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
  
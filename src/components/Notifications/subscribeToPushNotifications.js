import { sendSubscriptionToServer } from "./sendSubscriptionToServer";
import { getMessaging, getToken } from "firebase/messaging";

export function subscribeToPushNotifications(app) {
  // Retrieve the VAPID public key from environment variables
  const applicationServerKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;

  // Initialize Firebase Messaging
  const messaging = getMessaging();

  // Request a registration token from Firebase Messaging
  getToken(messaging, { vapidKey: applicationServerKey }).then((currentToken) => {
    // If a registration token is obtained
    if (currentToken) {
      // Send the subscription data (token) to the server
      sendSubscriptionToServer(currentToken);
    } else {
      // If no registration token is available
      // Handle the scenario where no token is available (e.g., request permission to generate one)
    }
  }).catch((err) => {
    // Handle errors that occur while retrieving the token
    //console.error('An error occurred while retrieving token. ', err);
  });
}

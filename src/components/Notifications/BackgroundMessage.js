import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize Firebase Messaging
const messaging = getMessaging();

// Set up a handler for background messages
onBackgroundMessage(messaging, (payload) => {
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

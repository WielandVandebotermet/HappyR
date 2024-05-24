// Import Firebase scripts needed for Firebase app and messaging services
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker with the given configuration
firebase.initializeApp({
    apiKey: "AIzaSyBOFv9soUJfczljNmQnHadXiXKryhz5M-8",
    authDomain: "happyr-32a1e.firebaseapp.com",
    projectId: "happyr-32a1e",
    storageBucket: "happyr-32a1e.appspot.com",
    messagingSenderId: "173610922189",
    appId: "1:173610922189:web:89d167a9c725005e5cf984",
    measurementId: "G-2PM2MEJ3QN"
});

// Retrieve an instance of Firebase Messaging to handle background messages
const messaging = firebase.messaging();

/**
 * Handle background messages received while the app is in the background.
 * This function triggers when a message is received and the app is not in the foreground.
 * 
 * @param {Object} payload - The message payload received from Firebase Cloud Messaging.
 */
messaging.onBackgroundMessage(function(payload) {
    // Extract notification title and options from the payload
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
    };

    // Show the notification with the extracted title and options
    self.registration.showNotification(notificationTitle, notificationOptions);
});

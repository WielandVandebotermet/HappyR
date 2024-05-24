// Import Firebase scripts needed for Firebase app and messaging services
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker with the given configuration
firebase.initializeApp({
    apiKey: ,
    authDomain: ,
    projectId: ,
    storageBucket: ,
    messagingSenderId: ,
    appId: ,
    measurementId: 
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

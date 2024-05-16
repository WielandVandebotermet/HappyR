
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBOFv9soUJfczljNmQnHadXiXKryhz5M-8",
      authDomain: "happyr-32a1e.firebaseapp.com",
      projectId: "happyr-32a1e",
      storageBucket: "happyr-32a1e.appspot.com",
      messagingSenderId: "173610922189",
      appId: "1:173610922189:web:89d167a9c725005e5cf984",
      measurementId: "G-2PM2MEJ3QN"
    });

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function(payload) {
      console.log('Received background message ', payload);
     // Customize notification here
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
      };
    
      self.registration.showNotification(notificationTitle,
        notificationOptions);
    });
export function sendSubscriptionToServer(Token) {
  // Construct the URL for the API endpoint
  const URL =
    process.env.REACT_APP_API_URL + process.env.REACT_APP_NOTIFICATION;
  
  // Get user ID and access token from localStorage
  const UserId = localStorage.getItem('UserId');
  const accessToken = localStorage.getItem('access_token');

  // Prepare subscription data
  const subscriptionData = {
    userId: UserId,
    token: Token
  };

  // Send a POST request to the server with subscription data
  fetch(URL + "subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
    },
    body: JSON.stringify(subscriptionData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send subscription data');
    }
  })
  .catch((error) => {
    console.error("Error sending subscription data:", error);
  });
}

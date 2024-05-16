import Cookies from "js-cookie";

export function sendSubscriptionToServer(
  Token
) {
  const URL =
    process.env.REACT_APP_API_URL + process.env.REACT_APP_NOTIFICATION;
  const UserId = Cookies.get("UserId");
  const accessToken = Cookies.get("access_token");

  const subscriptionData = {
    userId: UserId,
    token: Token
  };

  fetch(URL + "subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
    },
    body: JSON.stringify(subscriptionData),
  })
    .catch((error) => {
      console.error("Error sending subscription data:", error);
    });
}

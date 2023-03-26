import axios from "axios"
import { Subscription } from "../typing/subscription.interface"

const API = `${process.env.NEXT_PUBLIC_APP_API}/stripe`

// Creates a subscription for a user. Redirect him to stripe subscription panel
export const createSubscription = (subscription : Subscription, authUserId : string) => {
  return axios.post(`${API}/create-checkout-session`, {subscription, authUserId}).then((response) => response)
}

// Creates portal for a subscribed user once he has a subscription
export const createUserSubscriptionPortal = (userStripeId : string) => {
  return axios.post(`${API}/create-portal-session`, {userStripeId : userStripeId}).then((response) => response)
}

// Update auth0 user metadata with the customer stripe ID
export const updateUserMetadata = (stripeSessionId : string | null, authUserId : string) => {
  return axios.patch(`${API}/user-metadata`, {stripeSessionId : stripeSessionId, authUserId : authUserId}).then((response) => response)
}

// Get list of user's products name owned
export const getUserSubscriptions = (stripeUserId : string) : Promise<string>  => {
  return axios.post(`${process.env.NEXT_PUBLIC_LOCAL_API}/user/subscription`, { stripeUserId : stripeUserId }).then((resp) => resp.data)
}


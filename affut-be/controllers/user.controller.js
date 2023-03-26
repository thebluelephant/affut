const auth0Utils = require("../api/auth0.api");
const axios = require('axios');
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_ID);

exports.patchUserMetadataWithStripeId = async (authUserId, stripeId) => {
    try {
        const token = await auth0Utils.getManagementApiAccessToken()
        const options = {
            method: 'PATCH',
            url: `${process.env.AUTH0_API_URL}/users/auth0|${authUserId}`,
            headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json', "Accept-Encoding": "gzip,deflate,compress" },
            data: { user_metadata: { stripeId: stripeId } }
        };
        return axios.request(options).then((resp) => resp)
    } catch (error) {
        console.error(error);
    }
};

exports.getUserSubscription = async (stripeUserId) => {
    try {
        const subscriptionByUser = await stripe.subscriptions.list({
            customer: stripeUserId
        });
        let subscriptions = []

        // We filter subscriptions to keep only ones that are active aka. not canceled 
        subscriptionByUser.data.forEach((sub) => {
            const validStatus = ['active', 'trialing', 'past_due']
            if (validStatus.includes(sub.status)) { subscriptions.push(sub.items.data) }
        })
        // For each subscription, we get the product name
        const products = [].concat(...subscriptions).map((product) => product.plan.product)

        //For the moment we can only have one subscription so we just return the product name
        return products[0]
    }
    catch (error) {
        return error
    }
}




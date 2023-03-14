const auth0Utils = require("../api/auth0.api");
const axios = require('axios');

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




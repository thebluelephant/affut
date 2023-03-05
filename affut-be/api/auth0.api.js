const axios = require('axios');
require('dotenv').config();

exports.getManagementApiAccessToken = () => {
    const options = {
        method: 'POST',
        url: `${process.env.AUTH0_MANAGEMENT_API_URL}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: `${process.env.AUTH0_API_URL}/`
        })
    };

    return axios.request(options).then((response) => response.data.access_token).catch(function (error) {
        console.error(error);
    });
}

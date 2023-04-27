const axios = require('axios');
const jobUtils = require('../utils/jobs.utils');
const mocks = require('../controllers/mockPoleEmploi')
require('dotenv').config();

/**
 * @returns Pole emploi access token for job offers API
 */
exports.getJobOfferApiToken = () => {
    const body = {
        'grant_type': 'client_credentials',
        'client_id': process.env.POLEEMPLOI_CLIENTID,
        'client_secret': process.env.POLEEMPLOI_CLIENTSECRET,
        'scope': 'api_offresdemploiv2 o2dsoffre',
    }
    return axios.post(process.env.POLEEMPLOI_TOKENAPI,
        body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then((response) => {
        return response.data
    })
}

/**
 * 
 * @param locality 
 * @param jobKeyWord 
 * @returns job offers list
 * 
 */
exports.searchJobOffers = (jobKeyWord, locality) => {
    /* return this.getJobOfferApiToken().then((tokenData) => {
        const token = `${tokenData.token_type} ${tokenData.access_token}`;
        let url = process.env.POLEEMPLOI_JOBOFFERAPI;

        if (locality) {
            url += `&commune=${locality}`
        }
        if (jobKeyWord) {
            url += `&motsCles=${jobKeyWord}`
        }
        return axios.get(url, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            return jobUtils.formatPoleEmploiToJob(response.data.resultats)
        })
    }) */
    return jobUtils.formatPoleEmploiToJob(mocks.poleEmploiMocks)

}
const axios = require('axios');
const jobUtils = require('../utils/jobs.utils');
const mocks = require('../controllers/mockRapidJobs')
require('dotenv').config();

exports.searchJobOffersFromRapidApi = (jobKeyWord, locality) => {
    /*     const url = 'https://jsearch.p.rapidapi.com/search'
    
        return axios.get(url, {
            params: { query: `${jobKeyWord ?? ''} ${locality ?? ''} France`, num_pages: '1' },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        })
            .then((res) => {
                console.log(res.data.data);
                return jobUtils.formatRapidJobToJob(res.data.data);
            }) */
    return jobUtils.formatRapidJobToJob(mocks.rapidJobsMock)
}

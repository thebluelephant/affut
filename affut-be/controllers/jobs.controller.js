const poleEmploiJobsUtils = require("../api/poleEmploiJobs.api");
const rapidApiJobsUtils = require("../api/rapidApiJobs.api");
const { getUserSubscription } = require("./user.controller");
const subscriptionPlans = require('../utils/subscription.utils');
const { all } = require("axios");

// Create and Save a new followup
exports.getAll = async (req, res) => {
    try {
        const subscription = await getUserSubscription(req.query.stripeId)

        // Call the 2 API's at the same time
        const results = await Promise.all([
            poleEmploiJobsUtils.searchJobOffers(req.query.jobName, parseInt(req.query.localitycode)),
            // rapidApiJobsUtils.searchJobOffersFromRapidApi(req.query.jobName, req.query.localitycity)
        ]);

        // Get the data of each call
        const poleEmploiJobs = results[0];
        const rapidApiJobs = results[1];
        const allJobs = rapidApiJobs ? poleEmploiJobs.concat(rapidApiJobs) : poleEmploiJobs;

        // Manage data with subscription plan : Free plan = 25 results, starter plan = 50 results, premium plan = unlimited
        if (allJobs) {
            if (subscription) {
                if (subscription === subscriptionPlans.starterSubscription) {
                    res.send(allJobs.slice(0, 50))
                } else if (subscription === subscriptionPlans.premiumSubscription) {
                    res.send(allJobs)
                } else res.send(allJobs.slice(0, 25))
            } else {
                // If the user doesnt have a stripeId, he's on free plan and can only see the 25 first results
                res.send(allJobs.slice(0, 25))
            }
        } else res.send([])

    } catch (error) {
        console.error(error);
    }
};



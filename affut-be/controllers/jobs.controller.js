const poleEmploiJobsUtils = require("../api/poleEmploiJobs.api");
const rapidApiJobsUtils = require("../api/rapidApiJobs.api");

// Create and Save a new followup
exports.getAll = async (req, res) => {
    try {
        // Appeler les deux APIs en même temps
        const results = await Promise.all([
            poleEmploiJobsUtils.searchJobOffers(req.query.jobName, req.query.locality),
            // rapidApiJobsUtils.searchJobOffersFromRapidApi(req.query.jobName, req.query.locality)
        ]);

        // Récupérer les données de chaque appel
        const poleEmploiJobs = results[0];
        const rapidApiJobs = results[1];
        const allJobs = rapidApiJobs ? poleEmploiJobs.concat(rapidApiJobs) : poleEmploiJobs;

        res.send(allJobs)
    } catch (error) {
        console.error(error);
    }
};



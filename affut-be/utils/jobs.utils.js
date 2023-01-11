const formatter = require('../utils/formatter.utils');
/**
 * 
 * @param {*} rapidJobs[]
 * @returns A list of jobs formatted
 */
exports.formatRapidJobToJob = (rapidJobs) => {
    return rapidJobs.map(job => {
        return {
            id: job.job_id,
            intitule: formatter.capitalize(job.job_title),
            description: job.job_description,
            dateCreation: job.job_posted_at_datetime_utc,
            lieuTravail: {
                libelle: formatter.capitalize(job.job_city),
                latitude: job.job_latitude,
                longitude: job.job_longitude,
                commune: formatter.capitalize(job.job_city)
            },
            entreprise: {
                nom: formatter.capitalize(job.employer_name),
                logo: job.employer_logo,
                url: job.employer_website
            },
            typeContrat: job.job_employment_type,
            salaire: {
                libelle: job.job_max_salary ?? job.job_min_salary,
            },
            contact: {
                urlRecruteur: job.job_apply_link,
                urlPostulation: job.job_apply_link
            },
            origineOffre: {
                origine: job.job_publisher,
                urlOrigine: job.job_apply_link,
            }
        }
    })
}

/**
 * 
 * @param {*} poleEmploiJobs[]
 * @returns A list of jobs formatted
 */
exports.formatPoleEmploiToJob = (poleEmploiJobs) => {

    return poleEmploiJobs.map(job => {
        return {
            ...job,
            intitule: formatter.capitalize(job.intitule),
            lieuTravail: {
                libelle: formatter.capitalize(job.lieuTravail.libelle),
                commune: formatter.capitalize(job.lieuTravail.commune)
            },
            entreprise: {
                nom: formatter.capitalize(job.entreprise.nom)
            }
        };
    });

}
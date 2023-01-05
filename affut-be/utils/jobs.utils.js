
/**
 * 
 * @param {*} rapidJobs[]
 * @returns A list of jobs formatted
 */
exports.formatRapidJobToJob = (rapidJobs) => {
    return rapidJobs.map(job => {
        return {
            id: job.job_id,
            intitule: job.job_title,
            description: job.job_description,
            dateCreation: job.job_posted_at_datetime_utc,
            lieuTravail: {
                libelle: job.job_city,
                latitude: job.job_latitude,
                longitude: job.job_longitude,
                commune: job.job_city
            },
            entreprise: {
                nom: job.employer_name,
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
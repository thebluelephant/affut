import axios from 'axios';
import { Job } from '../typing/job.interface';
import { PoleEmploiToken } from '../typing/poleemploi.interfaces';

/**
 * @returns Pole emploi access token for job offers API
 */
export const getJobOfferApiToken: () => Promise<PoleEmploiToken> = () => {
    const body = {
        'grant_type': 'client_credentials',
        'client_id': process.env.NEXT_PUBLIC_POLEEMPLOI_CLIENTID,
        'client_secret': process.env.NEXT_PUBLIC_POLEEMPLOI_CLIENTSECRET,
        'scope': 'api_offresdemploiv2 o2dsoffre',
    }
    return axios.post(`https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire`,
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
export const searchJobOffers = (jobKeyWord?: string, locality?: number): Promise<Job[]> => {
    return getJobOfferApiToken().then((tokenData) => {
        const token = `${tokenData.token_type} ${tokenData.access_token}`;
        let url = `${process.env.NEXT_PUBLIC_POLEEMPLOI_JOBOFFERAPI}/offres/search?`;

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
            return response.data.resultats
        })
    })

}
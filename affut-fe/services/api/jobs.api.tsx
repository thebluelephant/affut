import axios from 'axios';
import { Job } from '../typing/job.interface';

const baseApi = process.env.NEXT_PUBLIC_APP_API

/**
 * 
 * @param locality 
 * @param jobKeyWord 
 * @returns job offers list
 * 
 */
export const searchJobOffers = (jobKeyWord?: string, locality?: number): Promise<Job[]> => {
    return axios.get(`${baseApi}/jobs/getJobsBy?jobName=${jobKeyWord}&locality=${locality}`).then((response) => {
        return response.data
    })

}
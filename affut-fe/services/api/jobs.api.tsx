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
  let url = `${baseApi}/jobs/getJobsBy?`;
  if (jobKeyWord) {
    url += `&jobName=${jobKeyWord}`
  }
  if (locality) {
    url += `&locality=${locality}`
  }
  return axios.get(url).then((response) => {
    return response.data
  })

}
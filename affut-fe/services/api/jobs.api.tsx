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
export const searchJobOffers = (jobKeyWord?: string, locality?:  { city: string; code: number; }, userStripeId? : string) : Promise<Job[]> => {
  let url = `${baseApi}/jobs/getJobsBy?`;

  if (jobKeyWord) {
    url += `&jobName=${jobKeyWord}`
  }
  if (locality) {
    url += `&localitycity=${locality.city}&localitycode=${locality.code}`
  }
  if (userStripeId){
    url += `&stripeId=${userStripeId}`
  }
  
  return axios.get(url).then((response) => response.data)

}
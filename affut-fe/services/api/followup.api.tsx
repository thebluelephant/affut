import axios from 'axios';
import { Followup } from '../typing/followup.interface';

const baseApi = process.env.NEXT_PUBLIC_APP_API
/**
 * @returns List of follwups for a certain user
 */
export const getUserFollowUps: (userId: string, stripeId? : string) => Promise<Followup[]> = (userId, stripeId) => {
  let url = `${baseApi}/followup/getByUserId/${userId}/`
  try {
    if (stripeId){
      url += `?&stripeid=${stripeId}`
    }

    return axios.get(url).then((response) => {
      return response.data
    })
  } catch (e) {
    console.log(e);
  }

}

/**
 * Update a follow up 
 */
export const updateFollowup: (followup: Followup) => Promise<number> = (followup) => {
  return axios.put(`${baseApi}/followup/update/${followup.id}`, followup).then((response) => {
    return response.status
  })
}
/**
 * Delete a follow up 
 */
export const deleteFollowup: (followupId: string) => Promise<Followup> = (followupId) => {
  return axios.delete(`${baseApi}/followup/delete/${followupId}`).then((response) => {
    return response.data
  })
}

/**
 * Create a follow up 
 */
export const createFollowup = (followup: Followup, stripeId? : string) => {
  try {
    return axios.post(`${baseApi}/followup/new`, {followup, stripeId}).then((response) =>  response.data)
  } catch (error) {
    console.log(error);
  }  
}

export const hasUserAlreadyCandidates: (userId: string, company: string, jobName: string) => Promise<boolean> = (userId, company, jobName) => {
  const data = {
    userId: userId,
    company: company,
    jobName: jobName
  }
  return axios.post(`${baseApi}/followup/hasUserAlreadyCandidates`, data).then((response) => {
    return response.data
  })
}


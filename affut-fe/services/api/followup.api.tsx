import axios from 'axios';
import { Followup } from '../typing/followup.interface';

const baseApi = process.env.NEXT_PUBLIC_APP_API
/**
 * @returns List of follwups for a certain user
 */
export const getUserFollowUps: (userId: string, canAccessUnlimitedFollowups : boolean) => Promise<Followup[]> = (userId, canAccessUnlimitedFollowups) => {
  return axios.get(`${baseApi}/followup/getByUserId/${userId}/?canAccessUnlimitedFollowups=${canAccessUnlimitedFollowups}`).then((response) => {
    return response.data
  })
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
export const createFollowup: (followup: Followup, canAccessUnlimitedFollowups : boolean) => Promise<{success : boolean, data : any}> = (followup, canAccessUnlimitedFollowups) => {
  return axios.post(`${baseApi}/followup/new`, {followup, canAccessUnlimitedFollowups}).then((response) =>  response)
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


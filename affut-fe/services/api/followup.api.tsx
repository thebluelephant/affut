import axios from 'axios';
import { Followup } from '../typing/followup.interface';

const baseApi = process.env.NEXT_PUBLIC_APP_API
/**
 * @returns List of follwups for a certain user
 */
export const getUserFollowUps: (userId: string) => Promise<Followup[]> = (userId) => {
    return axios.get(`${baseApi}/followup/getByUserId/${userId}`).then((response) => {
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

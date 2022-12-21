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
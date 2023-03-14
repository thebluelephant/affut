import axios from 'axios';

const baseApi = process.env.NEXT_PUBLIC_APP_API

/**
 * Generate cover letter + increment user count of 1
 */
export const generate = (userId : string, form : { lastname : string, firstname: string, job : string, strenght : string }) => {
  return axios.post(`${baseApi}/coverletter/generateLetter/${userId}`, form).then((response) => {
    return response.data
  })
}

/**
 * Get user cover letter count - reinit each time the user has 3 tries + the first try older than 1 month
 */
export const getCoverLetterCount = (userId : string) => {
  return axios.get(`${baseApi}/coverletter/${userId}`).then((response) => response.data)
}
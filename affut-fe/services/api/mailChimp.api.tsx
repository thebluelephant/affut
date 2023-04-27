import axios from 'axios';

export const postNewEmail = (email: string) => {
  return axios.post(`/api/mailchimp`, { email }).then((response) => {
    return response
  })
}
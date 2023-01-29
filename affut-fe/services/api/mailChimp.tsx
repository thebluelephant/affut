import axios from 'axios';
const mailchimp = require('@mailchimp/mailchimp_marketing');

export const postNewEmail = (email: string) => {
    return axios.post(`/api/mailchimp`, { email }).then((response) => {
        return response
    })
}
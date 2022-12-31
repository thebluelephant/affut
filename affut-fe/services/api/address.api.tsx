import axios from 'axios';

export const getCityPostalCode = (city: string) => {
    return axios.get(`https://api-adresse.data.gouv.fr/search/?q=${city}&type=municipality`).then((response) => {
        return response.data.features.map((cityGroup) => {
            return {
                city: cityGroup.properties.city,
                code: cityGroup.properties.postcode
            }
        })
    })
}
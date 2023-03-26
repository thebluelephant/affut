import axios from 'axios';

export const getCityPostalCode = (city: string) => {
  return axios.get(`https://api-adresse.data.gouv.fr/search/?q=${city}&type=municipality`).then((response) => {
    return response.data.features.map((cityGroup) => {
      return {
        city: cityGroup.properties.city,
        code: cityGroup.properties.id //We don't take the postcode, but the id. It makes a difference on the research
      }
    })
  })
}
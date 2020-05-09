import axios from 'axios';

const Api = axios.create({
  baseURL: ''
});

export default Api;

export const postPayment = ( {referenceId, value, firstName, lastName, document, email, phone} ) => {

  return Api.post('/payment', {
    referenceId,
    value,
    firstName,
    lastName, 
    document, 
    email, 
    phone
  })
  .then(res => res.data);
};
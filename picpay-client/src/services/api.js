import axios from 'axios';

const api = axios.create({
  baseURL: '<PUT_HERE_THE_SERVER_URL>'
});

export const postPayment = ({ referenceId, value, firstName, lastName, document, email, phone }) => {
  return api.post('/payments', {
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
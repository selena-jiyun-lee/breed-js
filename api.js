// import axios from 'axios';

const api = axios.create({
	baseURL: 'https://dog.ceo/api/breeds/',
});

const breedsApi = {
	getAll: () => api.get('list/all'),
};

export default breedsApi;

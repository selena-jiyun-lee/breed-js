import axios from 'axios';

const api = axios.create({
	baseURL: 'https://dog.ceo/api/',
});

const breedsApi = {
	getAll: () => api.get('breeds/list/all'),
	getBreed: breed => api.get(`breed/${breed}/images/random/10`),
	getSubBreed: (breed, subBreed) => api.get(`breed/${breed}/${subBreed}/images/random`),
};

export default breedsApi;

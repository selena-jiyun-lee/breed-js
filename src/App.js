import api from '../api.js';
import Main from './Main.js';
import BreedModal from './BreedModal.js';

export default function App($app) {
	this.state = {
		breedsList: {},
		selectedBreed: { name: '', images: [], subBreeds: [], isFavorite: false },
		filteredFavorite: false,
	};

	this.setState = nextState => {
		this.state = nextState;
		main.setState({
			breedsList: this.state.breedsList,
			filteredFavorite: this.state.filteredFavorite,
		});
		breedModal.setState({
			selectedBreed: this.state.selectedBreed,
		});
	};

	this.getBreed = async name => {
		try {
			const {
				data: { message: images },
			} = await api.getBreed(name);

			const selectedBreed = this.state.breedsList[name];
			let subBreeds = [];

			// If there are subBreeds, Call the subBreeds data
			if (selectedBreed.subBreeds.length > 0) {
				const promises = selectedBreed.subBreeds.map(async subBreed => {
					const {
						data: { message: image },
					} = await api.getSubBreed(name, subBreed);
					return { name: subBreed, image };
				});

				subBreeds = await Promise.all(promises);
			}

			return {
				name,
				images,
				subBreeds,
				isFavorite: selectedBreed.isFavorite,
			};
		} catch (error) {
			throw new Error(error);
		}
	};

	const main = new Main({
		$app,
		initialState: {
			breedsList: this.state.breedsList,
			filteredFavorite: this.state.filteredFavorite,
		},
		onClick: async name => {
			// When list item is clicked, Open the modal
			try {
				const breedInfo = await this.getBreed(name);
				const isFavorite = this.state.breedsList[name].isFavorite;
				this.setState({ ...this.state, selectedBreed: { ...breedInfo, isFavorite } });
			} catch (error) {
				throw new Error(error);
			}
		},
		onFilterClick: () => {
			const { filteredFavorite } = this.state;
			this.setState({ ...this.state, filteredFavorite: !filteredFavorite });
		},
	});

	const breedModal = new BreedModal({
		$app,
		initialState: { selectedBreed: this.state.selectedBreed },
		onClose: () => {
			this.setState({ ...this.state, selectedBreed: { name: '', images: [], subBreeds: [] } });
		},
		onFavoriteClick: name => {
			let { breedsList, selectedBreed } = this.state;
			const isFavorite = breedsList[name].isFavorite;
			breedsList[name].isFavorite = !isFavorite;
			selectedBreed.isFavorite = !isFavorite;
			this.setState({
				...this.state,
				breedsList,
				selectedBreed,
			});
		},
	});

	const init = async () => {
		try {
			const {
				data: { message },
			} = await api.getAll();
			let breedsList = {};
			Object.entries(message).forEach(([breed, subBreeds]) => {
				breedsList[breed] = {
					subBreeds,
					isFavorite: false,
				};
			});
			this.setState({ ...this.state, breedsList });
		} catch (error) {
			throw new Error(error);
		}
	};

	init();
}

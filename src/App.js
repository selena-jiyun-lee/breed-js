// import { Modal } from 'bootstrap';
import api from '../api.js';
import Main from './Main.js';
import BreedModal from './BreedModal.js';

export default function App($app) {
	this.state = {
		breedsList: {},
		selectedBreed: { name: '', images: [], subBreeds: [] },
	};

	this.setState = nextState => {
		this.state = nextState;
		main.setState(this.state.breedsList);
		breedModal.setState(this.state.selectedBreed);
	};

	this.getBreed = async name => {
		try {
			const {
				data: { message: images },
			} = await api.getBreed(name);

			const subBreedNames = this.state.breedsList[name];
			let subBreeds = [];

			if (subBreedNames.length > 0) {
				const promises = subBreedNames.map(async subBreed => {
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
			};
		} catch (error) {}
	};

	const main = new Main({
		$app,
		initialState: this.breedsList,
		onClick: async id => {
			try {
				const selectedBreed = await this.getBreed(id);

				this.setState({ ...this.state, selectedBreed });
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	const breedModal = new BreedModal({
		$app,
		initialState: this.state.selectedBreed,
		onClose: () => {
			this.setState({ ...this.state, selectedBreed: { name: '', images: [], subBreeds: [] } });
		},
	});

	const init = async () => {
		try {
			const {
				data: { message: breedsList },
			} = await api.getAll();
			this.setState({ breedsList });
		} catch (error) {
			throw new Error(error);
		}
	};

	init();
}

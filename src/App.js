import api from '../api.js';
import Main from './Main.js';

export default function App($app) {
	this.state = {
		breedsList: {},
	};

	this.setState = nextState => {
		this.state = nextState;
		main.setState(this.state.breedsList);
	};

	const main = new Main({
		$app,
		initialState: this.breedsList,
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

export default function App($app) {
	this.state = {
		breedsList: {},
	};

	this.setState = nextState => {
		this.state = nextState;
	};

	const init = async () => {
		console.log('init');
	};

	init();
}

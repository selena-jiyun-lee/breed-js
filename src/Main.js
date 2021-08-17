export default function Main({ $app, initialState, onClick }) {
	this.state = initialState;
	this.onClick = onClick;

	this.$target = document.createElement('div');
	this.$target.className = 'breed-list';
	$app.appendChild(this.$target);

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		// Clear nodes
		while (this.$target.hasChildNodes()) {
			this.$target.removeChild(this.$target.firstChild);
		}

		const $title = document.createElement('h1');
		$title.innerText = 'Dog Breeds';
		this.$target.appendChild($title);

		const $list = document.createElement('div');
		$list.className = 'list-group';
		if (this.state) {
			Object.keys(this.state).map(breed => {
				const $item = document.createElement('a');
				$item.innerText = breed;
				$item.className = 'list-group-item list-group-item-action breed';
				$item.dataset.id = breed;
				$item.dataset.bsToggle = 'modal';
				$item.dataset.bsTarget = '#breedModal';
				$item.dataset.bsBreed = breed;

				$list.appendChild($item);
			});
		}

		this.$target.appendChild($list);
		this.$target.querySelectorAll('.breed').forEach(breed => {
			breed.addEventListener('click', event => {
				this.onClick(event.target.dataset.id);
			});
		});
	};

	this.render();
}

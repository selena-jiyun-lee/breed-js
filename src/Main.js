export default function Main({ $app, initialState }) {
	this.state = initialState;

	this.$target = document.createElement('div');
	this.$target.className = 'breed-list';
	$app.appendChild(this.$target);

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		while (this.$target.hasChildNodes()) {
			this.$target.removeChild(this.$target.firstChild);
		}
		const $title = document.createElement('h1');
		$title.innerText = 'Breeds List';
		this.$target.appendChild($title);

		const $list = document.createElement('div');
		$list.className = 'list-group';
		if (this.state) {
			Object.keys(this.state).map(breed => {
				const $item = document.createElement('a');
				$item.innerText = breed;
				$item.className = 'list-group-item';
				$list.appendChild($item);
			});
		}

		this.$target.appendChild($list);
	};

	this.render();
}

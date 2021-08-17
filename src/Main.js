export default function Main({ $app, initialState, onClick, onFilterClick }) {
	this.state = initialState;
	this.onClick = onClick;
	this.onFilterClick = onFilterClick;

	this.$target = document.createElement('div');
	this.$target.className = 'container mt-2';
	$app.appendChild(this.$target);

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { breedsList, filteredFavorite } = this.state;
		// Clear nodes
		while (this.$target.hasChildNodes()) {
			this.$target.removeChild(this.$target.firstChild);
		}

		const $header = document.createElement('div');
		$header.className = 'py-5';
		const $title = document.createElement('h1');
		$title.innerText = 'Dog Breeds';
		const $row = document.createElement('div');
		$row.className = 'd-flex justify-content-end';
		const $myFavorite = document.createElement('button');
		$myFavorite.className = 'btn-myFavorite btn btn-outline-danger';
		$myFavorite.type = 'button';
		// If list is filtered, show 'Show All' button
		// If list isn't filtered, show 'My Favorite' button
		$myFavorite.innerHTML = filteredFavorite
			? `<span>Show All</span>`
			: `
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
			</svg>
			<span>My Favorite</span>`;

		$row.appendChild($myFavorite);
		$header.appendChild($title);
		$header.appendChild($row);

		const $list = document.createElement('div');
		$list.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2 g-lg-3';
		if (breedsList) {
			Object.entries(breedsList).map(([breed, { isFavorite }]) => {
				// When the list is filtered(filteredFavorite is true), only show the item that its isFavorite value is true
				// Or when the list isn't filtered(filteredFavorite is false), show all items
				if ((filteredFavorite && isFavorite) || !filteredFavorite) {
					const $item = document.createElement('div');
					$item.innerText = breed;
					$item.className = 'breed col border rounded text-capitalize p-2 fs-6';
					$item.dataset.id = breed;
					$item.dataset.bsToggle = 'modal';
					$item.dataset.bsTarget = '#breedModal';

					$list.appendChild($item);
				}
			});
		}

		this.$target.appendChild($header);
		this.$target.appendChild($list);

		// Add a click event to the item to open modal
		this.$target.querySelectorAll('.breed').forEach(breed => {
			breed.addEventListener('click', event => {
				this.onClick(event.target.dataset.id);
			});
		});

		// Add a click event to filter favorite items
		this.$target.querySelector('.btn-myFavorite').addEventListener('click', event => {
			this.onFilterClick();
		});
	};

	this.render();
}

import Carousel from './Carousel.js';
import SubBreeds from './SubBreeds.js';

export default function BreedModal({ $app, initialState, onClose, onFavoriteClick }) {
	this.state = initialState;
	this.onClose = onClose;
	this.onFavoriteClick = onFavoriteClick;

	this.$target = document.createElement('div');
	this.$target.className = 'modal';
	this.$target.id = 'breedModal';
	$app.appendChild(this.$target);

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const {
			selectedBreed: { name, images, subBreeds, isFavorite },
		} = this.state;

		// Heart icons
		const emptyHeart = `
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
				<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
			</svg>`;
		const filledHeart = `
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
			</svg>`;

		// Clear nodes
		while (this.$target.hasChildNodes()) {
			this.$target.removeChild(this.$target.firstChild);
		}

		const $modalDialog = document.createElement('div');
		$modalDialog.className = 'modal-dialog';

		const $modalContent = document.createElement('div');
		$modalContent.className = 'modal-content';

		const $modalHeader = document.createElement('div');
		$modalHeader.className = 'modal-header';
		$modalHeader.innerHTML = `
				<h5 class="modal-title">${name}</h5>
				<button class="btn-favorite btn btn-outline-danger" type="button" data-breed="${name}">${
			isFavorite ? filledHeart : emptyHeart
		}</button>
				<button class="btn-close" data-bs-dismiss="modal"></button>`;

		const $modalBody = document.createElement('div');
		$modalBody.className = 'modal-body';
		const $bodyContent = document.createElement('div');
		$bodyContent.className = 'h-100 w-100';

		const $carousel = Carousel(images);
		$bodyContent.appendChild($carousel);

		// If there are subBreeds, Add subBreed list below the carousel
		if (subBreeds.length > 0) {
			const $subBreeds = SubBreeds(subBreeds);
			$bodyContent.appendChild($subBreeds);
		}

		$modalBody.appendChild($bodyContent);
		$modalContent.appendChild($modalHeader);
		$modalContent.appendChild($modalBody);
		$modalDialog.appendChild($modalContent);
		this.$target.appendChild($modalDialog);

		// When modal close, clear the selected data
		this.$target.addEventListener('hidden.bs.modal', () => {
			this.onClose();
		});

		// Favorite toggle button
		this.$target.querySelector('.btn-favorite').addEventListener('click', event => {
			this.onFavoriteClick(event.currentTarget.dataset.breed);
		});
	};

	this.render();
}

import Carousel from './Carousel.js';
import SubBreeds from './SubBreeds.js';

export default function BreedModal({ $app, initialState, onClose }) {
	this.state = initialState;
	this.onClose = onClose;

	this.$target = document.createElement('div');
	this.$target.className = 'modal';
	this.$target.id = 'breedModal';
	$app.appendChild(this.$target);

	this.setState = nextState => {
		this.state = nextState;
		console.log(this.state);
		this.render();
	};

	this.render = () => {
		const { name, images, subBreeds } = this.state;
		console.log(this.state);
		console.log(subBreeds.length);
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
				<h5 class='modal-title'>${name}</h5>
				<button class='btn-close' data-bs-dismiss='modal'></button>`;

		const $modalBody = document.createElement('div');
		$modalBody.className = 'modal-body';
		const $bodyContent = document.createElement('div');
		$bodyContent.className = 'h-100 w-100';

		const $carousel = Carousel(images);
		$bodyContent.appendChild($carousel);

		if (subBreeds.length > 0) {
			console.log('hey');
			const $subBreeds = SubBreeds(subBreeds);
			$bodyContent.appendChild($subBreeds);
		}

		$modalBody.appendChild($bodyContent);
		$modalContent.appendChild($modalHeader);
		$modalContent.appendChild($modalBody);
		$modalDialog.appendChild($modalContent);
		this.$target.appendChild($modalDialog);

		// When modal close, clean the selected data
		this.$target.addEventListener('hidden.bs.modal', () => {
			this.onClose();
		});
	};

	this.render();
}

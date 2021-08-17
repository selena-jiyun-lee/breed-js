const Carousel = images => {
	const $carousel = document.createElement('div');
	$carousel.className = 'carousel slide';
	$carousel.id = 'carousel';
	$carousel.dataset.bsRide = 'carousel';

	const $carouselInner = document.createElement('div');
	$carouselInner.className = 'carousel-inner';
	$carouselInner.role = 'listbox';

	images.map((image, idx) => {
		const $carouselItem = document.createElement('div');
		$carouselItem.className = 'carousel-item';

		// First item should contain 'active' class - bootstrap carousel
		if (idx === 0) {
			$carouselItem.classList.add('active');
		}
		const $img = document.createElement('img');
		$img.src = image;
		$img.className = 'd-block w-100 mh-100';
		// Image size
		$img.style.objectFit = 'cover';
		$img.style.height = '25rem';
		$carouselItem.appendChild($img);
		$carouselInner.appendChild($carouselItem);
	});
	// prev, next buttons in the carousel
	$carousel.innerHTML = `
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>`;

	$carousel.prepend($carouselInner);

	return $carousel;
};

export default Carousel;

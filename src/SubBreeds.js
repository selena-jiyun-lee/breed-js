const SubBreeds = subBreeds => {
	const $row = document.createElement('div');
	$row.className = 'row row-cols-2 row-cols-md-3 g-2';

	subBreeds.map(subBreed => {
		const $col = document.createElement('div');
		$col.className = 'col';
		const $card = document.createElement('div');
		$card.className = 'card h-100 mh-100';

		const $img = document.createElement('img');
		$img.className = 'card-img-top';
		$img.src = subBreed.image;
		$img.style.objectFit = 'cover';
		$img.style.height = '10rem';
		const $title = document.createElement('h5');
		$title.className = 'card-title';
		$title.innerText = subBreed.name;

		$card.appendChild($img);
		$card.appendChild($title);
		$col.appendChild($card);
		$row.appendChild($col);
	});

	return $row;
};

export default SubBreeds;

export function loadimage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load',() => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadLevel(levelName) {
	return fetch(`/levels/${levelName}.json`)
	.then(r => r.json());
}
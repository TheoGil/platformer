function loadimage(url) {
    return new Promise(function(resolve){
        const image = new Image();
        image.addEventListener('load', function () {
                resolve(image);
        });
        image.src = url;
    });
}

const canvas = document.getElementById('scene');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

loadimage('/img/tiles.png')
.then(image => {
    context.drawImage(image, 0, 0);
});
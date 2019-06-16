// Source: https://www.html5rocks.com/en/tutorials/getusermedia/intro/

if (hasGetUserMedia()) {
    ready(function () {

        console.log('Your document is ready!');

        const constraints = {
            video: true
        };

        const video = document.querySelector('video');

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch((error) => {
                console.log(error.name, error.message);
            });
    })
} else {
    alert('getUserMedia() is not supported by your browser')
}

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
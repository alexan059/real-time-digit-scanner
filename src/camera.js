// Source: https://www.html5rocks.com/en/tutorials/getusermedia/intro/

import { $ } from '@/utils';

class Camera {

    /**
     * Video Element
     *
     * @type {null|HTMLVideoElement}
     * @private
     */
    _el = null;

    _constraints = {
        video: {
            facingMode: 'environment',
            // facingMode: 'user',
            width: { min: 240, ideal: 300, max: 400 },
            height: { min: 320, ideal: 300, max: 400 }
        }
    };

    constructor(el, constraints = {}) {
        this._el = $(el);
        this._constraints = Object.assign({}, this._constraints, constraints);

        if (this._el === null) {
            alert('Couldn\'t find video element.');
            return;
        }

        if (!Camera.hasGetUserMedia()) {
            alert('getUserMedia() is not supported by your browser.');
        }
    }

    getVideoSource() {
        return this._el;
    }

    getDimensions() {
        return new Promise(resolve => {
            this._el.addEventListener('loadedmetadata', () => {
                const ratio = this._el.videoWidth / this._el.videoHeight;
                const width = this._el.videoWidth - 100;
                const height = parseInt(width / ratio, 10);

                resolve({ width, height });
            }, false);
        });
    }

    stream() {
        navigator.mediaDevices.getUserMedia(this._constraints)
            .then((stream) => {
                this._el.srcObject = stream;
            })
            .catch((error) => {
                alert(`${ error.name }: ${ error.message }`);
            });
    }

    static hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

}

export default Camera;
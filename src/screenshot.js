import { $ } from '@/utils';

class Screenshot {

    /**
     *
     * @type {null|HTMLVideoElement}
     * @private
     */
    _src = null;

    /**
     *
     * @type {null|CanvasRenderingContext2D}
     * @private
     */
    _ctx = null;

    _timeout = 2000;
    _interval = null;

    _width = 0;
    _height = 0;

    constructor(src, dest, width, height) {

        const canvas = $(dest);
        this._ctx = canvas.getContext('2d');

        this._width = canvas.width = width;
        this._height = canvas.height = height;

        this._src = src;

        this.captureCycle()
    };

    captureCycle() {
        this._interval = setTimeout(() => {
            this.draw();
            this.captureCycle();
        }, this._timeout);
    }

    draw() {
        this._ctx.drawImage(this._src, 0, 0, this._width, this._height);
    }
}

export default Screenshot;
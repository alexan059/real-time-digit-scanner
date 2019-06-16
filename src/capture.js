import { $ } from '@/utils';

class Capture {

    /**
     * @type {null|HTMLVideoElement}
     * @private
     */
    _src = null;

    /**
     * @type {null|CanvasRenderingContext2D}
     * @private
     */
    _context = null;

    /**
     *
     * @type {null|HTMLCanvasElement}
     * @private
     */
    _canvas = null;

    _timeout = 50;
    _interval = null;

    _width = 0;
    _height = 0;

    _modifiers = [];

    constructor(src, dest, width, height) {
        this._canvas = $(dest);
        this._context = this._canvas.getContext('2d');

        this._width = this._canvas.width = width;
        this._height = this._canvas.height = height;

        this._src = src;
    };

    addModifier = (modifier) => this._modifiers.push(modifier);

    useModifiers() {
        for (let modifier in this._modifiers) {
            if (this._modifiers.hasOwnProperty(modifier)) {
                this._modifiers[modifier](this._context, this._width, this._height);
            }
        }
    }

    start() {
        this.draw();

        if (this._interval === null) {
            this._interval = setInterval(this.start.bind(this), this._timeout);
        }
    }

    stop() {
        clearInterval(this._interval);
        this._interval = null;
    }

    draw() {
        this._context.drawImage(this._src, 0, 0, this._width, this._height);

        this.useModifiers();

        // const data = this._context.getImageData(0, 0, this._width, this._height);

        // console.log(data);
    }

    getCanvas() {
        return this._canvas;
    }
}

export default Capture;
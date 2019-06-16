class ImageProcessor {

    static greyscale(context, width, height) {
        const imageData = context.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
            const red = pixels[i];
            const green = pixels[i + 1];
            const blue = pixels[i + 2];

            const grey = Math.round(0.299 * red + 0.587 * green + 0.114 * blue);

            pixels[i] = grey;
            pixels[i + 1] = grey;
            pixels[i + 2] = grey;
        }

        context.putImageData(imageData, 0, 0);
    }

    static brightness = (value) => (context, width, height) => {
        const imageData = context.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        const adjust = (value >= 0)
            ? (pix) => Math.min(pix + value, 255)
            : (pix) => Math.max(pix + value, 0);

        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = adjust(pixels[i]);
            pixels[i + 1] = adjust(pixels[i + 1]);
            pixels[i + 2] = adjust(pixels[i + 2]);
        }

        context.putImageData(imageData, 0, 0);
    };

    static invert(context, width, height) {
        const imageData = context.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = 255 - pixels[i];
            pixels[i + 1] = 255 - pixels[i + 1];
            pixels[i + 2] = 255 - pixels[i + 2];
        }

        context.putImageData(imageData, 0, 0);
    }
}

export default ImageProcessor;
import { ready } from '@/utils';
import Camera from '@/camera';
import Capture from '@/capture';
import ImageProcessor from '@/image-processor';

// Import styles
import '@/assets/main.scss';

ready(async () => {

    const camera = new Camera('video');

    if (Camera.hasGetUserMedia()) {
        camera.stream();

        const { width, height } = await camera.getDimensions();
        const video = camera.getVideoSource();

        const capture = new Capture(video, 'canvas', width, height);

        capture.addModifier(ImageProcessor.greyscale);
        capture.addModifier(ImageProcessor.brightness(100));
        capture.addModifier(ImageProcessor.invert);

        capture.start();

        // ImageProcessor.getBytesArray(canvas);

    }

});
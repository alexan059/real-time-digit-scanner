import { ready } from '@/utils';

// Import styles
import '@/assets/main.scss'
import Camera from '@/camera';
import Screenshot from '@/screenshot';

ready(async () => {

    const camera = new Camera('video');

    if (Camera.hasGetUserMedia()) {
        camera.stream();
        const {width, height} = await camera.getDimenstions();
        const video = camera.getVideoSource();

        const screenshot = new Screenshot(video, 'canvas', width, height);


    }

});
import * as tf from '@tensorflow/tfjs';

class Scanner {

    static IMAGE_WIDTH = 28;
    static IMAGE_HEIGHT = 28;

    static labels = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

    _model = null;

    static async initScanner() {
        const scanner = new Scanner();

        await scanner.loadModel('precise');

        return scanner;
    }

    async loadModel(version = 'default') {
        this._model = await tf.loadLayersModel(`./tensorflow/models/${ version }/mnist-model.json`);
    }

    analyze(image) {
        const tensor = tf.browser
            .fromPixels(image, 1)
            .resizeNearestNeighbor([28, 28])
            .reshape([1, 28, 28, 1])
            .cast('float32')
            .div(tf.scalar(255));

        const prediction = this._model.predict(tensor);
        const result = prediction.dataSync();
        const index = result.indexOf(Math.max(...result));

        return Scanner.labels[index];
    }

}

export default Scanner;
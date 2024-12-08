const tf = require('@tensorflow/tfjs-node');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const bucketName = 'YOUR_BUCKET_NAME';
const modelFileName = 'model/model.json';

const loadModel = async () => {
    const storage = new Storage();
    const localPath = path.join(__dirname, '../../model');
    
    await storage.bucket(bucketName).file(modelFileName).download({ destination: localPath });
    
    return tf.loadLayersModel(`file://${localPath}/model.json`);
};

module.exports = loadModel;
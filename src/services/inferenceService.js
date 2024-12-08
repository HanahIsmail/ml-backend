const { v4: uuidv4 } = require('uuid');

const inferImage = async (model, file) => {
    const imageBuffer = file._data;
    const tensor = tf.node.decodeImage(imageBuffer, 3).resizeNearestNeighbor([224, 224]).toFloat().expandDims(0);
    const prediction = await model.predict(tensor).data();
    
    const result = prediction[0] > 0.5 ? 'Cancer' : 'Non-cancer';
    const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';
    
    return {
        id: uuidv4(),
        result,
        suggestion,
        createdAt: new Date().toISOString(),
    };
};

module.exports = inferImage;
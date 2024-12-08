const InputError = require('../exceptions/InputError');
const inferImage = require('../services/inferenceService');
const loadModel = require('../services/loadModel');
const storeData = require('../services/storeData');

let model;

const initializeModel = async () => {
    model = await loadModel();
};

const predictHandler = async (request, h) => {
    try {
        const { payload } = request;
        const { file } = payload;

        if (!file || file._data.length > 1000000) {
            throw new InputError('Payload content length greater than maximum allowed: 1000000');
        }

        const result = await inferImage(model, file);
        await storeData(result);

        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data: result,
        }).code(200);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return h.response({
            status: 'fail',
            message: error.message || 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(statusCode);
    }
};

module.exports = { initializeModel, predictHandler };
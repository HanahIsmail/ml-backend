const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

const storePrediction = async (data) => {
    const predictionsCollection = firestore.collection('predictions');
    await predictionsCollection.doc(data.id).set(data);
};

module.exports = storePrediction;
import '@tensorflow/tfjs-node-gpu';
import '@tensorflow/tfjs';
import toxicity from '@tensorflow-models/toxicity';

let model = await toxicity.load(0.85, ['toxicity']);

const classify = async (inputs) => {
  const results = await model.classify(inputs);
  return results[0].results[0].match;
};

export default classify;
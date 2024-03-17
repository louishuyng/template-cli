import { Log } from './log.js';

const createAnswerStruct = async (templateChoice, answers = {}) => {
  const answerPath = `../cores/${templateChoice}/answers.js`;

  try {
    const { default: Answer } = await import(answerPath);
    return new Answer(answers);
  } catch (error) {
    Log.error(`No Answer struct found for ${templateChoice}. Please create one in ${answerPath}`);
  }
};

export { createAnswerStruct };

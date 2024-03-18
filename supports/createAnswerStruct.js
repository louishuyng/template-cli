const createAnswerStruct = async (templateChoice, answers = {}) => {
  const answerPath = `../cores/${templateChoice}/answers.js`;

  try {
    const { default: Answer } = await import(answerPath);

    return new Answer(answers);
  } catch (error) {
    return null;
  }
};

export { createAnswerStruct };

const createAnswerStruct = async (templateChoice, answers = {}) => {
  const answerPath = `../structs/${templateChoice}/answers.js`;

  try {
    const { default: Answer } = await import(answerPath);
    return new Answer(answers);
  } catch (error) {
    throw new Error(
      `No Answer struct found for ${templateChoice}. Please create one in ${answerPath}`
    );
  }
};

export { createAnswerStruct };

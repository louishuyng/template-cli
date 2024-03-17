const createAnswerStruct = async (templateChoice, answers = {}) => {
  const answerPath = `../structs/${templateChoice}/answers.js`;

  try {
    const { default: Answer } = await import(answerPath);
    return new Answer(answers);
  } catch (error) {
    console.error(
      `No Answer struct found for ${templateChoice}. Please create one in ${answerPath}`
    );
    process.exit(1);
  }
};

export { createAnswerStruct };

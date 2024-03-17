export class UserInput {
  constructor(templateChoice, answers) {
    this.templateChoice = templateChoice;
    this.answers = answers;
  }

  async data() {
    const generateDataPath = `./${this.templateChoice}/generateData.js`;

    try {
      const { default: generateData } = await import(generateDataPath);
      return generateData(this.answers);
    } catch (_error) {
      throw new Error(
        `No generateData function found for ${this.templateChoice}. Please create one in ${generateDataPath}`
      );
    }
  }
}

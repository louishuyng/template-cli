export class CreateUserInput {
  static async call(templateChoice, answers) {
    const generateDataPath = `../structs/${templateChoice}/handleBar.js`;

    try {
      const { default: generateData } = await import(generateDataPath);
      return generateData(answers);
    } catch (_error) {
      throw new Error(
        `No generateData function found for ${this.templateChoice}. Please create one in ${generateDataPath}`
      );
    }
  }
}

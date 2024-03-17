import { Log } from './log.js';

export class CreateUserInput {
  static async call(templateChoice, answers) {
    const generateDataPath = `../cores/${templateChoice}/toObj.js`;

    try {
      const { default: generateData } = await import(generateDataPath);
      return generateData(answers);
    } catch (_error) {
      Log.error(
        `No generateData function found for ${this.templateChoice}. Please create one in ${generateDataPath}`
      );
    }
  }
}

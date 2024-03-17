import * as fs from 'fs';
import { Log } from './log.js';

class ArgumentParser {
  static call(dirname) {
    const templateChoice = process.argv[2];
    const inputIndex = process.argv.findIndex(arg => arg.includes('--input='));

    if (!templateChoice) {
      return {
        templateChoice: null,
      };
    }

    // Check if templateChoice is support in the templates or not
    const CHOICES = fs.readdirSync(`${dirname}/templates`);

    if (!CHOICES.includes(templateChoice)) {
      Log.error(
        `Template ${templateChoice} is not supported. Please check again in folder templates`
      );
    }

    if (inputIndex === -1) {
      Log.error('Input is required. Please set input with --input=your-input');
    }

    const input = process.argv[inputIndex].split('=')[1];

    return { templateChoice, input };
  }
}

export { ArgumentParser };

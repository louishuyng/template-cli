import * as fs from 'fs';

class ArgumentParser {
  static call(dirname) {
    const target = process.argv[2];
    const inputIndex = process.argv.findIndex(arg => arg.includes('--input='));

    if (!target) {
      return {
        target: null,
      };
    }

    // Check if target is support in the templates or not
    const CHOICES = fs.readdirSync(`${dirname}/templates`);

    if (!CHOICES.includes(target)) {
      console.error(`Template ${target} is not supported. Please check again in folder templates`);
      process.exit(1);
    }

    if (inputIndex === -1) {
      console.error('Input is required. Please set input with --input=your-input');
      process.exit(1);
    }

    const input = process.argv[inputIndex].split('=')[1];

    return { target, input };
  }
}

export { ArgumentParser };

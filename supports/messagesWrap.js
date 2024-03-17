import { Log } from './log.js';

const CURR_DIR = process.cwd();

function messageGeneratingWrap(destination, callback) {
  Log.info('Generating template ⚡\n');
  callback();
  Log.success('\nTemplate generated 🎉');
  Log.info(`Destination: ${CURR_DIR}/${destination}`);
  Log.info('Happy coding! 🚀');
}

export { messageGeneratingWrap };

const CURR_DIR = process.cwd();

function messageGeneratingWrap(destination, callback) {
  console.log('Generating template ⚡\n');
  callback();
  console.log('\nTemplate generated 🎉');
  console.log(`Destination: ${CURR_DIR}/${destination}`);
  console.log('Happy coding! 🚀');
}

export { messageGeneratingWrap };

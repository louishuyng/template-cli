import chalk from 'chalk';

const log = console.log;

class Log {
  static info(message) {
    log(chalk.yellow(message));
  }

  static error(message) {
    log(chalk.red(message));
    process.exit(1);
  }

  static success(message) {
    log(chalk.green(message));
  }
}

export { Log };

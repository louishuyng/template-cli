#!/usr/bin/env node

// INIT SETUP
import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

// SUPPORTS
import createDirectoryContents from './supports/createDirectoryContents.js';
import { createAnswerStruct } from './supports/createAnswerStruct.js';
import { ArgumentParser } from './supports/argumentsParser.js';
import { messageGeneratingWrap } from './supports/messagesWrap.js';
import { Log } from './supports/log.js';

// STRUCTS
import { CreateUserInput } from './supports/createUserInput.js';

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const BASE_QUESTIONS = [
  {
    name: 'destination',
    type: 'input',
    message: 'Project Destination:',
  },
];
const QUESTIONS = [
  {
    name: 'template-choice',
    type: 'list',
    message: 'What template would you like to generate?',
    choices: CHOICES,
  },
  ...BASE_QUESTIONS,
];

const WITHOUT_ARGUMENTS_QUESTION = BASE_QUESTIONS;

function main() {
  const { templateChoice, input } = ArgumentParser.call(__dirname);

  if (templateChoice) {
    runningWithArguments(templateChoice, input);
  } else {
    runningWithoutArguments();
  }
}
main();

// MAIN FUNCTIONS
function runningWithoutArguments() {
  inquirer.prompt(QUESTIONS).then(answers => {
    const templateChoice = answers['template-choice'];
    const templatePath = `${__dirname}/templates/${templateChoice}`;
    const destination = answers['destination'];
    fs.mkdirSync(`${CURR_DIR}/${destination}`);

    extendQuestions(templateChoice, async (answersStruct, extendAnswers) => {
      let data = {};

      if (answersStruct) {
        data = await CreateUserInput.call(templateChoice, answersStruct);
      } else {
        data = extendAnswers;
      }

      messageGeneratingWrap(destination, () => {
        createDirectoryContents(templatePath, destination, data);
      });
    });
  });
}

async function extendQuestions(templateChoice, callback) {
  try {
    const questionsPath = `./cores/${templateChoice}/questions.js`;

    const { default: questionsForTemplate } = await import(questionsPath);

    inquirer.prompt(questionsForTemplate).then(async extendAnswers => {
      // We want to make answer to be more struct depends on the template
      const answersStruct = await createAnswerStruct(templateChoice, extendAnswers);

      callback(answersStruct, extendAnswers);
    });
  } catch (_error) {
    Log.info(`No questions found for ${templateChoice}.`);

    callback({});
  }
}

function runningWithArguments(templateChoice, inputPath) {
  // Remove .json from inputPath
  // We accept inputPath with or without .json
  if (inputPath.includes('.json')) {
    inputPath = inputPath.split('.json')[0];
  }

  Log.info('Running with arguments ⚡\n');
  Log.info(`Target: ${templateChoice} 🎯`);
  Log.info(`Input Sets: cores/${templateChoice}/sets/${inputPath}.json 📄\n`);

  const templatePath = `${__dirname}/templates/${templateChoice}`;

  inquirer.prompt(WITHOUT_ARGUMENTS_QUESTION).then(async answers => {
    const destination = answers['destination'];
    fs.mkdirSync(`${CURR_DIR}/${destination}`);

    // Read the answers cores/input-sets/<target>/<input>.json and parse it
    const extendAnswers = JSON.parse(
      fs.readFileSync(`./cores/${templateChoice}/sets/${inputPath}.json`, 'utf8')
    );

    const answersStruct = await createAnswerStruct(templateChoice, extendAnswers);

    let data = {};

    if (answersStruct) {
      data = await CreateUserInput.call(templateChoice, answersStruct);
    } else {
      data = extendAnswers;
    }

    messageGeneratingWrap(destination, () => {
      createDirectoryContents(templatePath, destination, data);
    });
  });
}

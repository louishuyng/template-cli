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

// STRUCTS
import { CreateUserInput } from './supports/createUserInput.js';

// QUESTIONS
import { BaseQuestion } from './questions/base.question.js';
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const QUESTIONS = [
  {
    name: 'template-choice',
    type: 'list',
    message: 'What template would you like to generate?',
    choices: CHOICES,
  },
  ...BaseQuestion,
];

// MAIN FUNCTION
inquirer.prompt(QUESTIONS).then(answers => {
  const templateChoice = answers['template-choice'];
  const templatePath = `${__dirname}/templates/${templateChoice}`;
  const destination = answers['destination'];
  fs.mkdirSync(`${CURR_DIR}/${destination}`);

  extendQuestions(templateChoice, async answers => {
    const data = await CreateUserInput.call(templateChoice, answers);

    console.log('Generating template ⚡\n');
    createDirectoryContents(templatePath, destination, data);
    console.log('\nTemplate generated 🎉');
    console.log(`Destination: ${CURR_DIR}/${destination}`);
    console.log('Happy coding! 🚀');
  });
});

async function extendQuestions(templateChoice, callback) {
  try {
    const questionsPath = `./questions/${templateChoice}/index.js`;

    const { default: questionsForTemplate } = await import(questionsPath);

    inquirer.prompt(questionsForTemplate).then(async answers => {
      // We want to make answer to be more struct depends on the template
      const answersStruct = await createAnswerStruct(templateChoice, answers);

      callback(answersStruct);
    });
  } catch (_error) {
    console.info(`No questions found for ${templateChoice}.`);

    callback({});
  }
}

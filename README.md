# Table of Contents
- [Description](#description)
- [Motivation](#motivation)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [How to add a new template?](#how-to-add-a-new-template)
  - [1. `questions.js`](#1-questionsjs)
  - [2. `answers.js` & `toObj.js`](#2-answersjs--toobjjs)
  - [3. `sets/`](#3-sets)
- [What we can do with the templating file?](#what-we-can-do-with-the-templating-file)

## Description
This is a CLI tool that allows you to generate code from a predefined template.

It will help you or your team to manage all the templates in one place 🗄️ and generate when needed 🔨.

## Motivation
As a developer, you might have to create the same code or configuration files multiple times with different constants or variables

And each time you have to copy and paste the same code and replace some constants or variables there and it is time-consuming 🕒

You can optimize this process by just doing two things
1. Create a template for that repetitive code or configuration files 📝
2. Run the CLI tool and select the template and input-set. It will generate the code for you. 🚀

### Template Example
```javascript
console.log('Hello World! {{name}}'); # {{name}} will be replaced with the input-set
```

## Requirements
Node.js 18.10.0 or any version that supports ES6.

## Installation
```bash
yarn
```
After installing the dependencies, you can install the CLI tool globally using the following command:
```bash
npm install -g
```

## Usage
To run the CLI with arguments, run the following command:
```
template-cli <template-name> --input <input>
```

- `<input>` is the name of input-set located in `cores/<template-name>/sets/<input>.json`

You can run the CLI without arguments and you will be prompted to select the template and input-set.
```bash
template-cli
```

## How to add a new template?

To add a new template, add a new folder in the `templates` directory

For example:
```bash
templates/
└── <template-name>/
    ├── index.ts
    ├── client.ts
    └── server.ts
```

Then add a new core setup for the template in the `cores` directory
```bash
cores/
└── <template-name>/
    ├── sets/ # (in case we want to run with arguments instead of prompt)
    │   ├── input1.json
    │   └── input2.json
    ├── questions.js # (required)
    ├── answers.js # (optional)
    └── toObject.js # (optional)
```

Following are the steps to setup a core for a new template:

1. [questions.js](#1-questionsjs)
2. [answers.js & toObject.js](#2-answersjs--toobjjs)
3. [sets](#3-sets)

### 1. `questions.js`
Create a new file in the `cores/<template-name>/questions.js` file. The file should default export an array of questions.

For example:
`cores/testing/questions.js`
```javascript
export default [
  {
    name: 'service-name',
    type: 'input',
    message: 'Service name:',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];
```

How to define a question: Read [here](https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/README.md#question)

### 2. `answers.js` & `toObj.js`

We can skip this step if we don't want to use a struct to modify the answers data.

#### Firstly, create an **answer struct** in the `cores/<template-name>/answers.js` file.
> Purpose of this struct is to hold the answers in a structured way.

Example of the struct is shown below.
`cores/testing/answers.js`
```javascript
export default class Answers {
  constructor(answers = {}) {
    this.answers = answers;
  }

  get serviceName() {
    return this.answers['service-name'];
  }
}
```

### 3. `sets/`

If we want to run the CLI with arguments instead of prompt, we can create a set of input-sets.

Create a new file in the `cores/<template-name>/sets` directory. The file should contain the input-set in json format.

For example:
`cores/testing/sets/input1.json`
```json
{
  "service-name": "testing-service"
}
```


#### Secondly, create a **toObj function** in the `cores/<template-name>/toObj.js` file.
> Purpose of this function is to map the answers struct to json that handlebars can use.

Example of the generateData function is shown below.
`cores/testing/toObj.js`
```javascript
export default function (answers) {
  return {
    name: answers.serviceName,
  };
}
```

## What we can do with the templating file?
> Template file a file that contains the code or configuration file with variables

The text inside the file will be replaced with the answers struct (that we created in this [optional step](#2-answersjs--toobjjs))

But if we don't want to use the answers struct, we can directly use the input-set or the answers object.

Example of a template file
`templates/testing/index.ts`
```javascript
console.log('Hello World! {{name}}');
```

The `{{name}}` will be replaced with the input-set or the answers object.

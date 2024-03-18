# Table of Contents
- [Description](#description)
- [Motivation](#motivation)
- [Structure](#structure)
  - [Core Details](#core-details)
  - [Template Example](#template-example)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
  - [1. Create list of questions](#1-create-list-of-questions)
  - [2. Create a struct to hold the answers to the questions](#2-create-a-struct-to-hold-the-answers-to-the-questions)
  - [3. Templating file](#3-templating-file)

## Description
This is a CLI tool that allows you to generate code from a predefined template.

It will help you or your team to manage all the templates in one place 🗄️ and generate when needed 🔨.

## Motivation
As a developer, you might have to create the same code or configuration files multiple times with different constants or variables

And each time you have to copy and paste the same code and replace some constants or variables there and it is time-consuming 🕒

You can optimize this process by just doing two things
1. Create a template for that repetitive code or configuration files 📝
2. Run the CLI tool and select the template and input-set. It will generate the code for you. 🚀

Following these below instructions, you can create a new template and use the CLI tool to generate the code.

## Structure
```bash
cores/
├── aws-serverless/ # Core setup for template AWS Serverless
└── microservice/ # Core setup for template Microservice
templates/ # (Team will add more templates)
├── aws-serverless/ # Template for AWS Serverless
│   ├── index.ts
│   ├── client.ts
│   └── server.ts
└── microservice/ # Template for Microservice
    ├── modules/
    ├── routes/
    └── app.ts
```

### Core Details
Here is the structure of the core setup for an AWS Serverless template
**Note**: You dont have to name the core setup as `aws-serverless`, name it as per your template name

```bash
cores/
└── aws-serverless/
    ├── sets/ # Set of inputs for the template
    │   ├── input1.json # Input set 1
    │   └── input2.json # Input set 2
    ├── questions.js # List of questions to ask the user
    ├── answers.js # Struct to hold the answers to the questions
    └── toObject.js # Convert answers struct to input-set for handlebars
```

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

## Customization

> Add a new template to the CLI tool.

To add a new template, add a new folder in the `templates` directory. Then when you run the CLI, you will be prompted to select the template you want to use.
> This will be a <template-name> during the creation of the template

To make the template work, you will need to do the following: (Can rerfer to the `cores/testing` for an example)

1. [Create list of questions to ask the user for the new template (required)](#1-create-list-of-questions)
2. [Create a struct to hold the answers to the questions (optional)](#2-create-a-struct-to-hold-the-answers-to-the-questions)
3. [Templating File](#3-templating-file)

### 1. Create list of questions
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

### 2. Create a struct to hold the answers to the questions

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

### 3. Templating file

We can use a json data generated from the answers struct to replace the variables in the templating file.

> See on previous step how to create a struct and a function to convert the struct to json. [previous step.](#secondly-create-a-generatedata-function-in-the-structstemplate-namegeneratedatajs-file)

Or if we skip the previous step, we can use the input-set or questions directly to replace the variables in the templating file.

```javascript
console.log('Hello World! {{name}}');
```

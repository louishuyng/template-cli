## Requirements
Node.js 18.10.0 or any version that supports ES6.

## Installation
```bash
yarn
```

## Usage
To install the CLI globally, run the following command:
```bash
npm install -g
```
 
To run the CLI, run the following command:
```
template-cli
```

## Extending New Templates

To add a new template, add a new folder in the `templates` directory. Then when you run the CLI, you will be prompted to select the template you want to use.
> This will be a <template-name> during the creation of the template

To make the template work, you will need to do the following:

1. [Create list of questions to ask the user for the new template (optional)](#1-create-list-of-questions)
2. [Create a struct to hold the answers to the questions (required)](#2-create-a-struct-to-hold-the-answers-to-the-questions)
3. [Inside template you can replace the placeholders with the answers from the struct (required)](#3-inside-template-you-can-replace-the-placeholders-with-the-answers-from-the-struct)

### 1. Create list of questions
Create a new file in the `questions/<template-name>.questions.js` file. The file should default export an array of questions.

For example:
`questions/new-micro-service.questions.js`
```javascript
const NewMicroServiceQuestion = [
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

export default NewMicroServiceQuestion;
```

### 2. Create a struct to hold the answers to the questions

#### Firstly, create an **answer struct** in the `structs/<template-name>/answers.js` file.
> Purpose of this struct is to hold the answers in a structured way.

Example of the struct is shown below.
`structs/new-micro-service/answers.js`
```javascript
class Answers {
  constructor(answers = {}) {
    this.answers = answers;
  }

  get serviceName() {
    return this.answers['service-name'];
  }
}

export default Answers;
```


#### Secondly, create a **generateData function** in the `structs/<template-name>/generateData.js` file.
> Purpose of this function is to map the answers struct to json that handlebars can use.

Example of the generateData function is shown below.
`structs/new-micro-service/generateData.js`
```javascript
function generateData(answers) {
  return {
    name: answers.serviceName,
  };
}

export default generateData;
```

### 3. Inside template you can replace the placeholders with the answers from the struct


Use handlebars placeholders to replace the data generated from the struct in [previous step.](#secondly-create-a-generatedata-function-in-the-structstemplate-namegeneratedatajs-file)

```javascript
class {{name}} { // This will be replaced by handlebars
  constructor() {
    console.log('Hello from {{name}}');
  }
}
```


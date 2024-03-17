class Answers {
  constructor(answers = {}) {
    this.answers = answers;
  }

  get serviceName() {
    return this.answers['service-name'];
  }
}

export default Answers;

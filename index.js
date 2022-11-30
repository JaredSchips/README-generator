// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => error ? console.log(error) : console.log('README created sucessfully'))
}

inquirer.prompt([
    {
      name: "Title",
      type: "input",
      message: "What's your project's name?",
    },
    {
      name: "Description",
      type: "input",
      message: "What's your project's description?",
    },
    {
      name: "Installation",
      type: "input",
      message: "What are the installation instructions?",
    },
    {
      name: "Usage",
      type: "input",
      message: "How do you use this project?",
    },
    {
      name: "Features",
      type: "input",
      message: "What features are included in this project?",
    },
    {
      name: "Badges",
      type: "input",
      message: "What badges do you have?",
    },
    {
      name: "Tests",
      type: "input",
      message: "What are some tests you can run on this project?",
    },
    {
      name: "Contribution",
      type: "input",
      message: "What are the guidelines for contributing to your project?",
    },
    {
      name: "Credits",
      type: "input",
      message: "Who should be included in the credits?",
    },
    {
      name: "License",
      type: "list",
      message: "What should the license be for your project?",
      choices: ["Unlicense", "MIT License", "GNU GPLv3", "No License"]
    }
  ]).then(results => {
    let data = ''

    data += `# ${results.Title} \n\n`

    writeToFile('output/README.md', data)
})
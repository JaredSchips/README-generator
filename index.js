// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => error ? console.log(error) : console.log('README created sucessfully'))
}

const sections = ["Title", "Description", "Table Of Contents", "Installation", "Usage", "Features", "Badges", "Tests", "Contribution", "Credits", "License"]

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
    
    if (results.License === 'No License') results.License = ''
    
    let badgeMD = ''
    switch (results.License) {
      case 'Unlicense':
        badgeMD = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
        break
      case 'MIT License':
        badgeMD = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
        break
      case 'GNU GPLv3':
        badgeMD = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
        break
    }

    results['Table Of Contents'] = ''
    for (const section of sections.slice(3)) {
        results['Table Of Contents'] += `[${section}](#${section}) \n\n`
    }

    data += `# ${results.Title} \n\n`
    
    if (results.License) data += badgeMD + `\n\n`

    for (const section of sections.slice(1, -1)) {
        data += `## ${section} \n\n`
        data += results[section] + '\n\n'
    }

    if (results.License) {
        data += `## License \n\n`
        data += `Licensed under ${results.License}`
    }

    writeToFile('output/README.md', data)
})
// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => error ? console.log(error) : console.log('README created sucessfully'))
}

const sections = ["Title", "Description", "Table Of Contents", "Installation", "Usage", "Features", "Badges", "Tests", "Contribution", "Credits", "License"]
const defaultSections = ["Title", "Description", "Installation", "Usage", "Credits", "License"]
const sectionObjs = []
for (section of sections) {
  sectionObjs.push({
    name: section,
    checked: defaultSections.includes(section)
  })
}

inquirer.prompt([
    {
      name: "Include",
      type: "checkbox",
      message: "What do you want to include in the README?",
      choices: sectionObjs.slice(0,-1)
    },
    {
      name: "Title",
      type: "input",
      message: "What's your project's name?",
      when: results => results.Include.includes("Title")
    },
    {
      name: "Description",
      type: "input",
      message: "What's your project's description?",
      when: results => results.Include.includes("Description")
    },
    {
      name: "Installation",
      type: "input",
      message: "What are the installation instructions?",
      when: results => results.Include.includes("Installation")
    },
    {
      name: "Usage",
      type: "input",
      message: "How do you use this project?",
      when: results => results.Include.includes("Usage")
    },
    {
      name: "Features",
      type: "input",
      message: "What features are included in this project?",
      when: results => results.Include.includes("Features")
    },
    {
      name: "Badges",
      type: "input",
      message: "What badges do you have?",
      when: results => results.Include.includes("Badges")
    },
    {
      name: "Tests",
      type: "input",
      message: "What are some tests you can run on this project?",
      when: results => results.Include.includes("Tests")
    },
    {
      name: "Contribution",
      type: "input",
      message: "What are the guidelines for contributing to your project?",
      when: results => results.Include.includes("Contribution")
    },
    {
      name: "Credits",
      type: "input",
      message: "Who should be included in the credits?",
      when: results => results.Include.includes("Credits")
    },
    {
      name: "License",
      type: "list",
      message: "What should the license be for your project?",
      choices: ["Unlicense", "MIT License", "GNU GPLv3", "No License"]
    }
  ]).then(results => {
    let data = ''
    const {Include, Title, License} = results

    shouldInclude = (sectionName) => Include.includes(sectionName)
    
    if (License === 'No License') License = ''
    
    let badgeMD = ''
    switch (License) {
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
        if (shouldInclude(section)) {
            results['Table Of Contents'] += `[${section}](#${section}) \n\n`
        }
    }

    if (shouldInclude('Title')) data += `# ${Title} \n\n`
    
    if (License) data += badgeMD + `\n\n`

    for (const section of sections.slice(1, -1)) {
        if (shouldInclude(section)) {
            data += `## ${section} \n\n`
            data += results[section] + '\n\n'
        }
    }

    if (License) {
        data += `## License \n\n`
        data += `Licensed under ${License}`
    }

    writeToFile('output/README.md', data)
})
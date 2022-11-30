// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => error ? console.log(error) : console.log('README created sucessfully'))
}


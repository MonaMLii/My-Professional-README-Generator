const inquirer = require('inquirer');
const fs = require('fs');
const { countReset } = require('console');


const showBadge = (license) => {
    return (license === 'Unlicense') ? "" : `![](https://img.shields.io/badge/license-${license}-green)`;
}

const showLicenseLink = (license) => {
    return (license === 'Unlicense') ? "" : `- [License](#license)`;
}

const showLicenseSection = (license) => {
    return (license === 'Unlicense') ? "" : 
    `## License 
    This project is licensed under the ${license} license
    `;
}


const generateREADME = ({ title, description, installation, usage, contribution, license, features,
     tests, github, email}) => 
{ return `
${showBadge(license)}

# ${title}

## Description
${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
${showLicenseLink(license)}
- [How to contribute](#contribution)
- [Tests](#tests)
- [Github Username](#github)
- [Email Address](#email)

## Installation
${installation}

## Usage
${usage}

## Contribution
${contribution}

${showLicenseSection(license)}

## Features
${features}

## Tests
${tests}

## GitHub
${github}

## Email
${email}`};


inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is your project title?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'What is the description for your project?',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'How to install your project?',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is the usage for your project?',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'How can other developers contribute to your project?',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project',
            choices: ['MIT', 'Apache', 'GPLv2', 'BSD 3-clause', 'Unlicense']
        },
        {
            type: 'input',
            name: 'features',
            message: 'What are the features for your project?',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Tests for your project?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
    ])

    .then((answers) => {
        const readmePageContent = generateREADME(answers);

        fs.writeFile('./dist/README.md', readmePageContent, (err) =>
            err ? console.log(err) : console.log('Successfully created README.md!')
        );
    });

    // 
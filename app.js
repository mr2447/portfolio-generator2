const inquirer = require('inquirer');

const {writeFile, copyFile} = require('./utils/generate-site.js')
const generatePage = require('./src/page-template.js');

// console.log (generatePage)
// const pageHTML = generatePage(name, github)


// fs.writeFile('./index.html', pageHTML, err => {
//     if(err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// })
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter GitHub Username');
                    return false; 
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about youself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
            }
        }
    ]);   
};

const promptProject = portfolioData => {
    
    if (!portfolioData.projects) {
        portfolioData.projects=[];
    }
    
    console.log(`
    ==============
    Add a New Project
    ==============
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message:'What is the name of your project? (Required)',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log('Please enter a project name.');
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Require)',
            validate: projectDes => {
                if (projectDes) {
                    return true;
                } else {
                    console.log('Please enter a description');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log('Please enter a GitHub link.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    })
}

promptUser()
.then(promptProject)
.then(portfolioData => {
    return generatePage(portfolioData);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
})
.then(copyFileResponse => {
    console.log(copyFileResponse);
})
.catch(err => {
    console.log(err);
});


// const pageHTML = generatePage(portfolioData);
// console.log(portfolioData)
// fs.writeFile('./dist/index.html', pageHTML, err => {
//     if(err) {
//         console.log(err);
//         return;
//     } else {
//     console.log('Portfolio complete! Check out index.html to see the output!');
//     }
//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             console.log('Style sheet copied successfully!')
//         }
//    });

// });
// });
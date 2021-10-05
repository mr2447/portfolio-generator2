
const fs = require('fs');
const generatePage = require('./src/page-template.js');


const [name, github] = profileDataArgs;
// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }
// };
// printProfileData(profileDataArgs)



fs.writeFile('index.html', generatePage(name, github), err => {
    if(err) throw new Rror(err);

    console.log('Portfolio complete! Check out index.html to see the output!');
})
//<--Here we are calling the npm requirements for our file-->
const fs = require("fs");
const path = require("path");
//must install inquirer
const inquirer = require("inquirer");
const open = require("open");
const convertFactory = require("electron-html-to");
var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});
conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
  if (err) {
    return console.error(err);
  }
  result.stream.pipe(fs.createWriteStream('profile.pdf'));
});
//const api = require("./api");
const generateHTML = require("./generateHTML");
//This is our inquirer prompt for collecting the user's input so we can change the background color and render their github information
inquirer.prompt([
    {
      type: "input",
      message: "What is your github username?",
      name: "username"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "color",
      choices: ["green", "blue", "pink", "red"],
    },
  ]).then(function(data) {
    //var filename = data.color.toLowerCase().split(' ').join('') + ".json";

  // fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {

  //   if (err) {
  //     return console.log(err);
  //   }

    console.log(data.color);

  });

    //console.log(data.choices);

    // var color = data.choices;
    // fs.writeFile(color, JSON.stringify(data, null, '\t'), function(err) {

    //   if (err) {
    //     return console.log(err);
    //   }
  
    //   console.log("Success!");
  
    // });
    
    
  //})
;




//const questions = [];

//function writeToFile(fileName, data) {
 
//}

//function init() {

//}

//init();

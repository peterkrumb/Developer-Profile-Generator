//<--Here we are calling the npm requirements for our file-->
//file system npm to activate readFile and writeFile
const fs = require("fs");
//const path = require("path");
//must install inquirer
const inquirer = require("inquirer");
//const open = require("open");
//const generateHTML = require("./generateHTML");
convertFactory = require("electron-html-to");
var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});

//const api = require("./api");

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
  ]).then(function (data) {
      console.log( data.color );
      //<--Here I am creating a variable which contains the content of the HTML to be written later on-->
      //const colors is taken from default "generateHTML" file. User's choice will render change of color on html file
      const colors = {
        green: {
          wrapperBackground: "#E6E1C3",
          headerBackground: "#C1C72C",
          headerColor: "black",
          photoBorderColor: "#black"
        },
        blue: {
          wrapperBackground: "#5F64D3",
          headerBackground: "#26175A",
          headerColor: "white",
          photoBorderColor: "#73448C"
        },
        pink: {
          wrapperBackground: "#879CDF",
          headerBackground: "#FF8374",
          headerColor: "white",
          photoBorderColor: "#FEE24C"
        },
        red: {
          wrapperBackground: "#DE9967",
          headerBackground: "#870603",
          headerColor: "white",
          photoBorderColor: "white"
        }
      };
      const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <link rel="stylesheet" href="style.css">
      </head>
      <body>
      
      <style>
      .wrapper {
        * background-color: ${colors[data.color].wrapperBackground}; */
        padding-top: 100px;
        }
        </style>
      <div class="container">
      
      </div>
      </body>
      </html>`
    //<--This is telling electron which file to convert, in this case its an html filed name newhtml, our const from above-->
conversion( {html: html} , function(err, result) {
  //<--If there's an error throw the error to the console log, otherwise use result.stream.pipe function taken from npm website-->
  if (err) {
    return console.error(err);
  }
  result.stream.pipe(fs.createWriteStream('./index.pdf'));
  conversion.kill();
});
  fs.writeFile("profile.pdf", html, function(err) {

    if (err) {
      return console.log(err);
    }
      console.log("Success!");
  


  });
});

    
  
   
    // });
    
    
  //})
;




//const questions = [];

//function writeToFile(fileName, data) {
 
//}

//function init() {

//}

//init();

//<--Here we are calling the npm requirements for our file-->
//file system npm to activate readFile and writeFile
const fs = require("fs");
//axios is our function to call an API
const axios = require("axios");
//const path = require("path");
//must install inquirer
const inquirer = require("inquirer");
//const open = require("open");
const generateHTML = require("./generateHTML");

// convertFactory = require("electron-html-to");
// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
//});

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
  ]).then(function ({ username, color }) {
      //console.log( username );
      const queryUrl = `https://api.github.com/users/${username}`;      

      axios.get(queryUrl).then(function(res){
      //<--Here I am setting values for the various API data to populate our HTML file-->
      name = res.data.name;
      picURL = res.data.avatar_url;
      location = res.data.location;
      githubURL = res.data.html_url;
      blogURL = res.data.blog
      bio = res.data.bio;
      numRepos = res.data.public_repos;
      numFollowers = res.data.followers;
      numFollowing = res.data.following;
      console.log(picURL);
      
          
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
      //<--This is our HTML file which will be written later on. It utilizes template literals to insert data from the user's profile in place of the different elements such as profile image, number of stars and so forth-->
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
        <div class="wrapper">
        <div class="container">
        <div class="photo-header">
            <div class="photo-header img">
            <img src="${picURL}" alt="avatar">
            </div>
            </div>
            <h1 class="photo-header">Hi!</h1>
            <h1 class="photo-header">My name is ${name}! </h1>
            </div>
            <div class="row"><h1>hi</h1></div>
            <div class="row"><h1>hi</h1></div>
        
        
    </div>
      </body>
      </html>`
      const css = `@page {
        margin: 0;
      }
     *,
     *::after,
     *::before {
     box-sizing: border-box;
     }
     html, body {
     padding: 0;
     margin: 0;
     }
     html, body, .wrapper {
     height: 100%;
     }
      body {
        background-color: white;
        -webkit-print-color-adjust: exact !important;
        font-family: 'Cabin', sans-serif;
        }
      .wrapper {
        * background-color: ${colors[color].wrapperBackground}; */
        padding-top: 100px;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'BioRhyme', serif;
          margin: 0;
          }
          h1 {
          font-size: 3em;
          }
          h2 {
          font-size: 2.5em;
          }
          h3 {
          font-size: 2em;
          }
          h4 {
          font-size: 1.5em;
          }
          h5 {
          font-size: 1.3em;
          }
          h6 {
          font-size: 1.2em;
          }
          .photo-header h1, .photo-header h2 {
            width: 100%;
            text-align: center;
            }
            .photo-header h1 {
            margin-top: 10px;
            }
          .photo-header img {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            object-fit: cover;
            margin-top: -75px;
            border: 6px solid ${colors[color].photoBorderColor};
            box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
            }
            .photo-header {
              position: relative;
              margin: 0 auto;
              margin-bottom: 0px;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              background-color: ${colors[color].headerBackground};
              color: ${colors[color].headerColor};
              padding: 10px;
              width: 95%;
              border-radius: 6px;
              }
              .card {
                padding: 20px;
                border-radius: 6px;
                background-color: ${colors[color].headerBackground};
                color: ${colors[color].headerColor};
                margin: 20px;
              }`
    //<--This is telling electron which file to convert, in this case its an html filed named html, our const from above-->
//conversion( {html: html} , function(err, result) {
//   //<--If there's an error throw the error to the console log, otherwise use result.stream.pipe function taken from npm website-->
//   if (err) {
//     return console.error(err);
//   }
//   result.stream.pipe(fs.createWriteStream('./index.pdf'));
//   conversion.kill();
// });
// }).catch(function (err) {
//   console.log(err);

fs.writeFile("profile.html", html, function(err) {

    if (err) {
      return console.log(err);
    }
      console.log("Success!");
});

fs.writeFile("style.css", css, function(err) {

  if (err) {
    return console.log(err);
  }
    console.log("Success!");
});

  });
  
  


});

    
  
   
    // });
    
    
  //})





//const questions = [];

//function writeToFile(fileName, data) {
 
//}

//function init() {

//}

//init();

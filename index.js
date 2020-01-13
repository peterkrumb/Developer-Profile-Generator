//<--Here we are calling the npm requirements for our file-->
//fs to activate readFile and writeFile
const fs = require("fs");
//axios is our function to call an API
const axios = require("axios");
//must install inquirer
const inquirer = require("inquirer");
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
  //<--Second part of axios call, uses function arguments as variables for what follows-->
]).then(function ({ username, color }) {
  const queryUrl = `https://api.github.com/users/${username}`;
  axios.get(queryUrl).then(function (res) {
    //<--Here I am setting values for the various API data to populate our HTML file-->
    const name = res.data.name;
    const picURL = res.data.avatar_url;
    const location = res.data.location;
    const githubURL = res.data.html_url;
    const blogURL = res.data.blog
    const bio = res.data.bio;
    const numRepos = res.data.public_repos;
    const numFollowers = res.data.followers;
    const numFollowing = res.data.following;
    console.log(picURL);
    //<--The number of stars function requires a different axios call-->
    axios.get(`https://api.github.com/users/${username}/starred`)
      .then(function (response) {
        numStarred = response.data.length;

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
  <title>Paul Cwik's Profile</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
  <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="wrapper">
    <div class="container">
      <div class="photo-header">
        <div class="photo-header img">
          <img src="https://avatars1.githubusercontent.com/u/43522729?v=4" alt="avatar">
        </div>
      </div>
      <h1 class="photo-header">Hi!</h1>
      <h1 class="photo-header">My name is ${name} </h1>
      <div class="photo-header">
        <div class="links-nav">
          <h6 class="nav-link"><i class="fas fa-location-arrow"></i>${location}</h6>
          <h6 class="nav-link"><i class="fas fa-rss"></i><a href="${blogURL}"></a></h6>
          <h6 class="nav-link"><i class="fab fa-github-alt"></i><a href="${githubURL}">GitHub</a></h6>
        </div>
      </div>
    </div>
    <main>
      <div class="container">
      <h4 style="text-align: center; font-weight: bold;">${bio}</h4>
        <div class="row">
        <div class="col-md-6">
        <div class="card"><h4>Public Repositories</h4><h6>${numRepos}</h6></div>
        <div class="card"><h4>GitHub Stars</h4><h6>${numStarred}</h6></div>
      </div>
      <div class="col-md-6">
        <div class="card"><h4>Followers</h4><h6>${numFollowers}</h6></div>
        <div class="card"><h4>Following</h4><h6>${numFollowing}</h6></div>
      </div>
        </div>
      </div>
    </main>
    <div class="wrapper">

    </div>


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
          background-color: ${colors[color].wrapperBackground};
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
          text-align: center;
          font-size: 1.5em;
          }
          h5 {
          font-size: 1.3em;
          }
          h6 {
          text-align: center;
          font-size: 1.2em;
          }
          main {
            background-color: #E9EDEE;
            height: auto;
            padding-top: 30px;
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
              }
              .links-nav {
                width: 100%;
                text-align: center;
                padding: 20px 0;
                font-size: 1.1em;
                }
                .nav-link {
                display: inline-block;
                margin: 5px 10px;
                }
                @media print { 
                  body { 
                    zoom: .75; 
                  }} `
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

        fs.writeFile("profile.html", html, function (err) {

          if (err) {
            return console.log(err);
          }
          console.log("Success!");
        });

        fs.writeFile("style.css", css, function (err) {

          if (err) {
            return console.log(err);
          }
          console.log("Success!");
        });

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

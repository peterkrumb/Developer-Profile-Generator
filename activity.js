var inquirer = require("inquirer")
var fs = require("fs")
var util = require("util")
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "Where are you from?",
            name: "from"
        },
        {
            type: "input",
            message: "Tell us about yourself.",
            name: "bio"
        },
        {
            type: "input",
            message: "What is your LinkedIn URL",
            name: "linked"
        },
        {
            type: "input",
            message: "What is your GitHub username",
            name: "git"
        }
    ])
    .then(function ({ name, from, bio, linked, git }) {
        console.log(name, from, bio, linked, git);
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>

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

        <div class="name"> My name is ${name}</div>
            <div> I am from ${from}</div>
            <div>About me: ${bio}</div>
            <div> My LinkedIn: ${linked}</div>
            <div>My github username is ${git}</div>
        </body>
        </html>`
        writeFileAsync("index.html", html)
        const css = `.name{
            color: purple;
        }`
        writeFileAsync("style.css", css)
    })
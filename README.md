# Developer Profile Generator

## Goal
The idea here is to work entirely with node.js backend and API calls in order to create an HTML file as well as a CSS one in this case. We use backend so as to make our work more secure. Axios calls hide the API key unlike an AJAX call, although I didnt need an API for this assignment.

## NPM Packages
Here we used inquirer which is essentially "prompt" in javascript. It's a package that must be installed that prompts and gathers user input. Our only questions were their favorite color and github username.
Axios call handled the majority of data we got from their username.

## Writing HTML file
For rendering an HTML and CSS file, with node you set the entire code to a variable. What you could also do that I didn't was use ".require = " and set it to the file name. Then we use the WriteFile method to create new files.




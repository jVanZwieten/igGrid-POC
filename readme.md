Purpose: to showcase a few features of the Infragistics igGrid, including:
1. support for Angular
2. use of custom formula calculated summaries, on each group-by level and grand total
3. group-by (dragging columns into the group-by area to group rows by dimensions)
4. hide/show columns
5. performance at high volume (43k records)
6. filtering/sorting
7. rows respond to right-click and expose the record and cell clicked


Installation:

Please note that NPM will be required to install the necessary packages.
1. install NPM: https://www.npmjs.com/
2. clone this repository (https://help.github.com/articles/cloning-a-repository/)
3. in your local repo, run the NPM command prompt
4. run "npm install"
5. run "npm start"
This should host the POC locally and open up your default browser to it.


Source code guide:

* The meat and potatoes of how to work the igGrid is located in app/app.component.ts.
* The custom styling is done in ig/financial.css
* The data can be found at app/services/JSONData.ts

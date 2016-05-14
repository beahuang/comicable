## Comicbook Web Application

# Installation
1. First you need node installed on your computer
2. Then cd into the project directory and run `npm install` to download all the dependencies
3. Run `gulp` and navigate to `localhost:8080`

# To Run Server
1. `node app/server.js` and you'll have a webserver at `localhost:8081`

# To Run the scrapy scraper script
1. `node app/scraper.js`

# Directory Information
```
comicable
│   README.md
│   app.py
|   gulpfile.js  -- Defines all the gulp tasks that can be run
|   package.json -- Defines all the dependencies needed
│
└───app
|   │   main.js -- Main JS file
|   │   third-party.js -- JS file with all the dependencies ie Angular, jQuery etc
|   │
|   ├───components  -- holds all the route views and their controllers
|   │   ├───issue-reader
|   │   ├───login
|   │   ├───modals
|   │   ├───my-favorites
|   │   ├───my-series
|   │   ├───released-issues
|   ├───images -- directory with pre minified images
|   ├───styles -- directory with sass files and fonts
|   │   ├───base -- base styles imported into main.scss
|   │   ├───fonts -- fonts and icons
|   │   main.scss -- Main SCSS file
└───dist
|   |   index.html -- main HTML page
|   ├───components -- holds all the route views and their controllers
|   │   ├───issue-reader
|   │   ├───login
|   │   ├───modals
|   │   ├───my-favorites
|   │   ├───my-series
|   │   ├───released-issues
|   |───images -- directory with pre minified images
|   |───scripts -- directory with main.js file and third-party.js
|   |───styles -- directory with sass files and fonts
|   |   ├───fonts -- fonts and icons
|   |   main.css  -- Main styles compiled from app/styles/main.scss
```

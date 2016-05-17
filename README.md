## Comicbook Web Application

# Installation
1. Install (HomeBrew)[http://brew.sh/]
2. Install `nvm` via `brew install nvm` and follow the prompts
3. Install `node` via `nvm install v6.1.0` -> `nvm use v6.1.0`
4. Install `mongodb` via `brew install mongodb`
5. Install `gulp` via `npm install -g gulp`
6. Install `mocha` via `npm install -g mocha`
7. Then cd into the project directory and run `npm install` to download all the dependencies

# To Run Server
1. `node app/server.js` and you'll have a webserver at `localhost:8081`

# To Run the scrapy scraper script
1. `node app/scraper.js`

# Database Setup
1. Start Mongo: `mongod`
2. Connect to the database: `node app/server.js`

# Run Tests
1. `npm test`

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

require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')
    , ugs = require('ultimate-guitar-scraper');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Connection to the database
massive(process.env.CONNECTIONSTRING).then(db => {
    app.set('db', db);
    console.log('Connection to the database was successfull.');
}).catch(err => console.log('Connection Error: ' + err));

//AUTHENTICATION


//API CALLS
//This call will search for two tab types based on band name
app.get('/api/bandSearch', (req, res) => {
    ugs.search({
        bandName: req.query.bandName,
        songName: '',
        type: ['tabs', 'chords'],
    }, function (error, tabs) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(tabs);
        }
    })
});

//This call will search for two tab types based on song name
app.get('/api/songSearch', (req, res) => {
    ugs.search({
        bandName: '',
        songName: req.query.songName,
        type: ['tabs', 'chords'],
    }, function (error, tabs) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(tabs);
        }
    })
});

//This will take the url and get the tab if its not in the DB already and then store it
//It will check if it has it before getting it, and if it has it. It will send back the tab content from db.
app.get('/api/tabContent', (req, res) => {
    let tabUrl = req.query.tabUrl;
    let tabDifficulty = req.query.tabDifficulty;
    
    app.get('db').get_matched_tab(tabUrl).then(dbTab => {
        if (dbTab.length === 0) {
            ugs.get(tabUrl, (error, tab) => {
                app.get('db').storeTab(tab.type, tabUrl, tab.artist, tab.name,
                     tabDifficulty, tab.rating, tab.numberRates, tab.contentText).then(response => {
                        res.status(200).send(tab.contentText);
                    })
            })
        } else {
            res.status(200).send(dbTab[0])
        }
    })
})

//NODEMON PORT
const PORT = 3030;
app.listen(PORT, () => console.log('Reporting for duty on port: ' + PORT));
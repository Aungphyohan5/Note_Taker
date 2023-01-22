const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs = require('fs')
const util = require('util');
const uuid = require('./helpers/uuid.js');
// const api = require('./routes/index.js');
// const { readAndAppend, readFromFile } = require('./Helpers/fsUtils');

//set port number
const PORT = process.env.PORT || 3001;

//init express
const app = express();


// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


// route for notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);


/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};


// route for notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


app.post('/api/notes', (req, res) => {


    // check wther received the post request or not
    console.info(`${req.method} request has been received`)


    //  to get the new note data from body
    const { title, text } = req.body;

    // if title & text exist, create newNote
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),

        };



        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));

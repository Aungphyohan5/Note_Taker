const express = require('express')
const uuid = require('../helpers/uuid.js');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

const app = express()

// route for notes
app.get('/', (req, res) => {
    console.info(`${req.method} request received for note`);
    readFromFile('./db/db.json').then((data) => res.send(JSON.parse(data)));
});




// delete route for notes
app.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for note`);
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);
            res.json(`note ${noteId} has been deleted ␡`);
        })
})

app.post('/', (req, res) => {
    // check wther received the post request or not
    console.info(`${req.method} request has been received`)
    //  to get the new note data from body
    const { title, text } = req.body;
    // if title & text exist, create newNote
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),

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

module.exports = app;
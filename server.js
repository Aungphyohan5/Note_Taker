const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs = require('fs')
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

// route for notes
app.get('/api/notes', (req, res) => res.json(db));


app.post('/api/notes', (req, res) => {

    // check wther received the post request or not
    console.info(`${req.method} request has been received`)

    //  to get the new note data from body
    const { noteTitle, noteText } = req.body;

    // if noteTitle & noteText exist, create newNote
    if (noteTitle && noteText) {
        const newNote = {
            noteTitle,
            noteText,
            note_id: uuid(),
        };

        fs.readFile(db, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(db,
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        })

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

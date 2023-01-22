const express = require('express');
const path = require('path');
// const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

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

app.post('/notes', (req, res) => {
    const { noteTitle, noteText } = req.body
    if (noteTitle && noteText) {
        const newNote = {
            noteTitle,
            noteText,
        };
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response)
        res.status(201).json(response);
    }
});


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));

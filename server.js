const express = require('express');
const path = require('path');
// const uuid = require('./helpers/uuid.js');
// const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils')
const api = require('./routes/notes');

//set port number
const PORT = process.env.PORT || 3001;

//init express
const app = express();


// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api)

app.use(express.static('public'));

// route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


// route for notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));



app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));

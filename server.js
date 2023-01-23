const express = require('express');
const path = require('path');
const api = require('./route/notes'); // notes.js under router folder

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


// route to fire the server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));

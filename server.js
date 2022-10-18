const express = require('express');
const path = require('path');
const notes = require('./routes/notes.js')
const html = require('./routes/html.js')

const app = express();
const PORT = process.env.PORT || 3001

// Parse URL encoded & JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// host public folder
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', notes);

// use html routes
app.use('/', html);


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
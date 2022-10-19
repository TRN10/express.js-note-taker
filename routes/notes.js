const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


// GET route for retrieving saved notes

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// POST Route for saving note

router.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// API route for deleting note

router.delete('/notes/:id', (req, res) => {
    readFromFile('./db/db.json')
        .then((notes) => {

            return JSON.parse(notes).filter(n => n.id !== req.params.id)
        })
        .then((updatedNotes) => writeToFile('./db/db.json', updatedNotes))

        .then(() => res.json({ ok: true }))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;
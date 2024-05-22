const express = require('express');
const Router = express.Router();

const {
    getNotes,
    getOneNote,
    createNote,
    deleteNote,
    updateNote } = require('../controller/notesController');

Router.get('/',getNotes);
Router.get('/:noteId',getOneNote);
Router.post('/',createNote)
Router.delete('/:noteId',deleteNote)
Router.patch('/:noteId',updateNote)

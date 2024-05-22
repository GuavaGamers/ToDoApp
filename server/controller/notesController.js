const Note = require('../models/Notes');

// Get all notes 
const getNotes = async(req, res) => {
    try {
        const notes = await Note.findAll();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error : error.message})
    }
};

// Get a one note using its ID
const getOneNote = async (req,res) => {
    try {
        const noteId = req.params.noteId;
        const note = await Note.findByPk(noteId);
        
        if(note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message : `No note with ID ${noteId} found` });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNote = async (req, res) => {
    try {
        const noteCreated = req.body;
        await Note.create(noteCreated);
        const newNote = await Note.findOne({ where: { title: noteCreated.title, content: noteCreated.content } }); 

        if(newNote){
            res.status(201).send("The new note has been created");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const updateNote = async (req, res) => {
    try {
        const newInfo = req.body;
        const noteId = req.params.noteId;
        const note = await Note.findByPk(noteId);
        if (note) {
            await note.update(newInfo);
            res.status(200).send(`Note with ID ${noteId} has been updated`);
        } else {
            res.status(404).json({ message: `Note with ID ${noteId} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const foundNote = await Note.findByPk(noteId);
        if (foundNote) {
            await foundNote.destroy();
            res.status(200).send("Note removed!");
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    getNotes,
    getOneNote,
    createNote,
    updateNote,
    deleteNote
};
const Note = require("../models/note");

const fetchNotes = async(req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json({ notes });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const fetchNote = async (req, res) => {
    try{
        const noteId = req.params.id;
        const note = await Note.findOne({_id: noteId, user: req.user._id});
        res.json({ note });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const createNote = async (req, res) => {
    try {
        const { title, body } = req.body;
        const note = await Note.create({
            title,
            body,
            user: req.user._id
        });
        res.json({ note })
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, body } = req.body;
        await Note.findOneAndUpdate( 
        {id: noteId, user: req.user._id}, 
        {
            title,
            body
        }
        );
        const note = await Note.findById(noteId);
        res.json({ note});
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        await Note.deleteOne({id: noteId, user: req.user._id});
        res.json({ success: "Record deleted" });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
    
};

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}
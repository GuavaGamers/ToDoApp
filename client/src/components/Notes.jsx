import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../Notes.css';
import axios from 'axios';

const Notes = ({ loggedInUser }) => {
  const [notes, setNotes] = useState(loggedInUser.notes);
  console.log('NOTES:::', notes);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isEditing, setIsEditing] = useState(0);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/api/users/${loggedInUser.id}`);
        console.log('RESPONSE USE EFFECT: ', response.data.notes);
        setNotes(response.data.notes);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };
    if (loggedInUser) {
      fetchNotes();
    }
  }, [loggedInUser]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Could not delete note', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const body = {
        title: newNoteTitle,
        content: newNoteContent,
        userId: loggedInUser.id,
      };
      const response = await axios.post('/api/notes', body);

      const newNote = response.data;
      console.log('NEW NOTE::', newNote);
      setNotes([...notes, newNote]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsAdding(false);
    } catch (error) {
      console.error('Could not add note', error);
    }
  };

  const handleEditClick = (note) => {
    setIsEditing(note.id);
    setEditNoteTitle(note.title);
    setEditNoteContent(note.content);
  };

  const handleEditNote = async () => {
    try {
      const body = {
        title: editNoteTitle,
        content: editNoteContent,
      };

      console.log('BODY::::', body);

      const response = await axios.put(`/api/notes/${isEditing}`, body);
      const updatedNote = response.data;
      console.log('UPDATED NOTE:::', updatedNote);
      setNotes(
        notes.map((note) => (note.id === isEditing ? updatedNote : note))
      );
      setIsEditing(0);
      setEditNoteTitle('');
      setEditNoteContent('');
    } catch (error) {
      console.error('Could not edit note', error);
    }
  };

  return (
    <div className="notes">
      <h2>Notes</h2>
      <button className="add-task" onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add Task'}
      </button>
      {isAdding && (
        <div className="add-note-form">
          <input
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder="Enter note title"
          />
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Enter note content"
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
      )}
      {isEditing && (
        <div className="edit-note-form">
          <input
            type="text"
            value={editNoteTitle}
            onChange={(e) => setEditNoteTitle(e.target.value)}
            placeholder="Edit note title"
          />
          <textarea
            value={editNoteContent}
            onChange={(e) => setEditNoteContent(e.target.value)}
            placeholder="Edit note content"
          />
          <button onClick={handleEditNote}>Save Changes</button>
          <br></br>
          <button onClick={() => setIsEditing(null)}>Cancel</button>
        </div>
      )}
      <div className="notes-grid">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <p className="note-date">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="note-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(note)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(note.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No notes are available.</p>
        )}
      </div>
    </div>
  );
};

export default Notes;

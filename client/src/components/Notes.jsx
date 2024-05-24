import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../Notes.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('There was an error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

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
      console.error("Could not delete note", error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newNoteTitle, content: newNoteContent }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add note', errorText);
        throw new Error('Failed to add note: ' + errorText);
      }

      const newNote = await response.json();
      setNotes([...notes, newNote]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsAdding(false);
    } catch (error) {
      console.error("Could not add note", error);
    }
  };

  const handleEditClick = (note) => {
    setIsEditing(note.id);
    setEditNoteTitle(note.title);
    setEditNoteContent(note.content);
  };

  const handleEditNote = async () => {
    try {
      const response = await fetch(`/api/notes/${isEditing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editNoteTitle, content: editNoteContent }),
      });
      const updatedNote = await response.json();
      setNotes(notes.map(note => (note.id === isEditing ? updatedNote : note)));
      setIsEditing(null);
      setEditNoteTitle('');
      setEditNoteContent('');
    } catch (error) {
      console.error("Could not edit note", error);
    }
  };

  return (
    <div className='notes'>
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
          notes.map(note => (
            <div key={note.id} className='note-item'>
              <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <p className="note-date">{new Date(note.createdAt).toLocaleString()}</p>
              </div>
              <div className="note-actions">
                <button className="edit-button" onClick={() => handleEditClick(note)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(note.id)}>
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
}

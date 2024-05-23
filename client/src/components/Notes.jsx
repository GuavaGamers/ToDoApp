import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../Notes.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async() => {
      try{
        const response = await fetch('/api/notes');
        if(!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('There was an error fetching notes:', error)
      }
    };

    fetchNotes();
  },[]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if(!response.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Could not delete note", error)
    }
  }

  return (
    <div className='notes'>
      <h2>Notes</h2>
      <button className="add-task">Add Task</button>
      {notes.length > 0 ? (
        <ul>

          {notes.map(note => (
            <li key={note.id} className='note-item'>
              <div className="note-content">
                <h3>{note.title}</h3>
                <p>{new Date(note.createdAt).toLocaleString()}</p>
              </div>

              <div className="note-actions">
                <button className="edit-button">
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(note.id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes are available.</p>
      )}
    </div>
  );
}
import React, { useEffect, useState } from 'react'

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

  return (
    <div>Notes
      {notes.length > 0 ? (
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}
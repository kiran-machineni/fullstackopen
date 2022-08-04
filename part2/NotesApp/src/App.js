import { useState } from "react"
import Note from "./components/Note"

function App(props) {
	const [notes, setNotes] = useState(props.notes)
	const [newNote, setNewNote] = useState("a New Note...")
	const [showAll, setShowAll] = useState(true)

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important === true)

	const addNote = event => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
			id: notes.length + 1
		}
		setNotes(notes.concat(noteObject))
		setNewNote("")
	}

	const handleNoteChange = event => {
		setNewNote(event.target.value)
	}
	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					Show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map(note => (
					<Note key={note.id} note={note} />
				))}
			</ul>
			<form onSubmit={addNote}>
				<input type="text" value={newNote} onChange={handleNoteChange} />
				<input type="submit" value="save" />
			</form>
		</div>
	)
}

export default App

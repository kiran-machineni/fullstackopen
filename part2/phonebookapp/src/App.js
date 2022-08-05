import { useState } from "react"

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
	])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [searchName, setSearchName] = useState("")

	const handleSubmit = event => {
		event.preventDefault()
		if (persons.every(person => person.name !== newName) && newName !== "") {
			const newPerson = {
				name: newName,
				number: newNumber
			}
			setPersons(persons.concat(newPerson))
			setNewName("")
			setNewNumber("")
		} else alert(`${newName} is already added to phonebook`)
	}

	const handleNewName = event => {
		setNewName(event.target.value)
	}

	const handleNewNumber = event => {
		setNewNumber(event.target.value)
	}

	const handleSearch = event => {
		setSearchName(event.target.value)
	}

	const filterPersons = persons.filter(person => {
		const regex = new RegExp(searchName, "i")
		if (searchName) return person.name.match(regex)
		else return person
	})

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={searchName} onSearch={handleSearch} />
			<h2>add a new</h2>
			<PersonForm
				submit={handleSubmit}
				name={newName}
				number={newNumber}
				nameChange={handleNewName}
				numberChange={handleNewNumber}
			/>
			<h2>Numbers</h2>
			{filterPersons.map((person, id) => (
				<Persons id={id} personName={person.name} personNumber={person.number} />
			))}
		</div>
	)
}

const Filter = ({ value, onSearch }) => {
	return (
		<div>
			filter shown with <input value={value} onChange={onSearch} />
		</div>
	)
}

const PersonForm = ({ submit, name, number, nameChange, numberChange }) => {
	return (
		<form onSubmit={submit}>
			<div>
				name: <input value={name} onChange={nameChange} />
			</div>
			<div>
				number: <input value={number} onChange={numberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Persons = ({ id, personName, personNumber }) => {
	return (
		<div id={id}>
			<Person personName={personName} personNumber={personNumber} />
		</div>
	)
}

const Person = ({ personName, personNumber }) => {
	return (
		<div>
			{personName} {personNumber}
		</div>
	)
}

export default App

import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [searchName, setSearchName] = useState("")

	useEffect(() => {
		axios
			.get("http://localhost:3001/persons")
			.then(response => setPersons(response.data))
	}, [])

	const handleSubmit = event => {
		event.preventDefault()
		if (persons.every(person => person.name !== newName) && newName !== "") {
			const newPerson = {
				name: newName,
				number: newNumber,
				id: persons.length + 1
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
			{filterPersons.map(person => (
				<div key={person.id}>
					<Persons personName={person.name} personNumber={person.number} />
				</div>
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

const Persons = ({ personName, personNumber }) => {
	return <Person personName={personName} personNumber={personNumber} />
}

const Person = ({ personName, personNumber }) => {
	return (
		<>
			{personName} {personNumber}
		</>
	)
}

export default App

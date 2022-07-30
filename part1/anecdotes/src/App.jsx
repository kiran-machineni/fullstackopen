/*
 * Created by Kiran Kumar Machineni on Sat Jul 30 2022 7:53:15 PM
 */

import { useState } from "react"

function App() {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients."
	]

	const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

	const randomAnecdotes = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length))
	}

	const voteAnecdotes = selected => {
		const pointsCopy = [...points]
		pointsCopy[selected] += 1
		setPoints(pointsCopy)
	}

	const mostVotesIndex = points.indexOf(Math.max(...points))

	return (
		<div>
			<Heading text="Anecdotes of the day" />
			<Anecdotes anecdote={anecdotes[selected]} />
			<Votes value={points[selected]} />
			<Button text="vote" handleClick={() => voteAnecdotes(selected)} />
			<Button text="next anecdotes" handleClick={randomAnecdotes} />
			<Heading text="Anecdotes with most votes" />
			<Anecdotes anecdote={anecdotes[mostVotesIndex]} />
			<Votes value={points[mostVotesIndex]} />
		</div>
	)
}
const Heading = ({ text }) => <h2>{text}</h2>
const Anecdotes = ({ anecdote }) => <div>{anecdote}</div>
const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
)
const Votes = ({ value }) => <div>has {value}</div>

export default App

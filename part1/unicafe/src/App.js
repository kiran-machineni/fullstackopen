/*
 * Created by Kiran Kumar Machineni on Sat Jul 30 2022 2:40:50 AM
 */


import React, { useState } from "react"

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const all = good + neutral + bad
	const positive = (all ? (good * 100) / all : 0) + "%"
	const average = (good - bad) / all

	return (
		<div>
			<h2>give feedback</h2>
			<Button text="Good" handleClick={() => setGood(good + 1)} />
			<Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
			<Button text="Bad" handleClick={() => setBad(bad + 1)} />
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positive}
			/>
		</div>
	)
}

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	return (
		<div>
			<h2>statistics</h2>
			{all ? (
				<table>
					<tbody>
						<StatisticLine text="good" value={good} />
						<StatisticLine text="neutral" value={neutral} />
						<StatisticLine text="bad" value={bad} />
						<StatisticLine text="all" value={all} />
						<StatisticLine text="average" value={average} />
						<StatisticLine text="positive" value={positive} />
					</tbody>
				</table>
			) : (
				<div>no feedback given</div>
			)}
		</div>
	)
}

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
)

export default App

import React, { useState, useEffect } from "react"
import "./calculator.scss"

export default function Calculator() {
	const [currentExpression, setCurrentExpression] = useState([])
	const [currentTotal, setCurrentTotal] = useState(0)

	// Lookup table to convert words to numerals/symbols
	const mathLookup = {
		zero: 0,
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
		decimal: ".",
		add: "+",
		subtract: "-",
		multiply: "*",
		divide: "/",
		equals: "=",
		factorial: "!",
		exponent: "^",
	}

	const allowedKeys = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		".",
		"+",
		"-",
		"*",
		"x",
		"X",
		"/",
		"=",
		"!",
		"^",
		"Backspace",
		"c",
		"C",
	]

	function backspaceInput() {
		setCurrentExpression((previousCurrentExpression) =>
			previousCurrentExpression.slice(0, -1)
		)
	}

	function resetCalculator() {
		setCurrentExpression([])
		setCurrentTotal(0)
	}

	function solveExpression() {
		console.log(currentExpression)
	}

	function handleClickInput(event) {
		// Set input to alphabetic value
		const input = event.target.id

		if (mathLookup[input] || input === "zero") {
			setCurrentExpression((previousCurrentExpression) => [
				...previousCurrentExpression,
				mathLookup[input],
			])
		} else {
			console.log("Not a valid input.")
		}
	}

	useEffect(() => {
		function handleKeyboardInput(event) {
			if (event.key === "Backspace") {
				event.preventDefault()
				backspaceInput()
			} else if (event.key.toLowerCase() === "c") {
				resetCalculator()
			} else if (allowedKeys.includes(event.key)) {
				setCurrentExpression((previousCurrentExpression) => [
					...previousCurrentExpression,
					event.key,
				])
			} else {
				console.log("Not a valid input.")
			}
		}

		window.addEventListener("keydown", handleKeyboardInput)

		return () => {
			window.removeEventListener("keydown", handleKeyboardInput)
		}
	}, [])

	// On equals input, parse array according to order of operations
	return (
		<div className="calculator" id="calculator">
			<div className="display" id="display">
				{currentExpression.join("")}
			</div>
			<div className="button-container">
				<div className="top-buttons">
					<div className="calc-label">CALC</div>
					<button className="top-button" id="clear" onClick={resetCalculator}>
						C
					</button>
					<button
						className="top-button"
						id="backspace"
						onClick={backspaceInput}
					>
						B
					</button>
				</div>
				<div className="numpad">
					<button className="num-button" id="nine" onClick={handleClickInput}>
						9
					</button>
					<button className="num-button" id="eight" onClick={handleClickInput}>
						8
					</button>
					<button className="num-button" id="seven" onClick={handleClickInput}>
						7
					</button>
					<button className="num-button" id="six" onClick={handleClickInput}>
						6
					</button>
					<button className="num-button" id="five" onClick={handleClickInput}>
						5
					</button>
					<button className="num-button" id="four" onClick={handleClickInput}>
						4
					</button>
					<button className="num-button" id="three" onClick={handleClickInput}>
						3
					</button>
					<button className="num-button" id="two" onClick={handleClickInput}>
						2
					</button>
					<button className="num-button" id="one" onClick={handleClickInput}>
						1
					</button>
					<button
						className="num-button"
						id="factorial"
						onClick={handleClickInput}
					>
						!
					</button>
					<button className="num-button" id="zero" onClick={handleClickInput}>
						0
					</button>
					<button
						className="num-button"
						id="decimal"
						onClick={handleClickInput}
					>
						.
					</button>
				</div>
				<div className="sympad">
					<button className="sym-button" id="exp" onClick={handleClickInput}>
						x<sup>2</sup>
					</button>
					<button className="sym-button" id="sqrt" onClick={handleClickInput}>
						&#8730;
					</button>
					<button
						className="sym-button"
						id="multiply"
						onClick={handleClickInput}
					>
						&#215;
					</button>
					<button className="sym-button" id="divide" onClick={handleClickInput}>
						&#247;
					</button>
					<button className="sym-button" id="add" onClick={handleClickInput}>
						&#43;
					</button>
					<button
						className="sym-button"
						id="subtract"
						onClick={handleClickInput}
					>
						&#8722;
					</button>
					<button className="sym-button" id="equals" onClick={solveExpression}>
						&#61;
					</button>
				</div>
			</div>
		</div>
	)
}

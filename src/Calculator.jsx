import React, { useState, useEffect } from "react"
import { Parser } from "expr-eval"
import "./calculator.scss"

export default function Calculator() {
	const [currentExpression, setCurrentExpression] = useState([0])

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
		root: "sqrt",
	}

	// Restrict entered keys to mathematical symbols
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

	// Add a number/symbol to the currentExpression
	function addToCurrentExpression(item) {
		// Remove default leading 0
		if (currentExpression[0] === 0 && item !== 0) {
			setCurrentExpression([])
		}
		console.log(item)
		if (currentExpression[currentExpression.length - 1] === 0 && item === 0) {
			console.log("no!")
			return
		}
		setCurrentExpression((previousCurrentExpression) => [
			...previousCurrentExpression,
			item,
		])
	}

	// Remove the last number/symbol from currentExpression
	function backspaceInput() {
		setCurrentExpression((previousCurrentExpression) =>
			previousCurrentExpression.slice(0, -1)
		)
	}

	// Wipe calculator for restart
	function resetCalculator() {
		setCurrentExpression([0])
	}

	// Parse and evaluate currentExpression
	function solveExpression() {
		const result = parseFloat(
			Parser.evaluate(currentExpression.join("")).toPrecision(8)
		)

		setCurrentExpression([result])
	}

	function handleClickInput(event) {
		// Set input to alphabetic value

		const input = event.target.id

		/* Solve expression if input is the equals button, 
		else, if it's a math symbol, look up the id's math symbol 
		and add to currentExpression 
		else, not valid input
		*/
		if (input === "equals") {
			solveExpression()
		} else if (mathLookup[input] || input === "zero") {
			addToCurrentExpression(mathLookup[input])
		} else {
			console.log("Not a valid input.")
		}
	}

	// Add keyboard event listener in useEffect
	useEffect(() => {
		function handleKeyboardInput(event) {
			event.preventDefault()
			if (event.key === "Backspace") {
				return backspaceInput()
			} else if (event.key.toLowerCase() === "c") {
				return resetCalculator()
			} else if (event.key === "Enter" || event.key === "=") {
				return solveExpression()
			} else if (allowedKeys.includes(event.key)) {
				if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(event.key))) {
					addToCurrentExpression(Number(event.key))
				} else {
					addToCurrentExpression(event.key)
				}
			} else {
				console.log("Not a valid input.")
			}
		}

		window.addEventListener("keydown", handleKeyboardInput)

		return () => {
			window.removeEventListener("keydown", handleKeyboardInput)
		}
	}, [currentExpression])

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
					<button
						className="sym-button"
						id="exponent"
						onClick={handleClickInput}
					>
						x<sup>y</sup>
					</button>
					<button className="sym-button" id="root" onClick={handleClickInput}>
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

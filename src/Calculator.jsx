import React, { useState, useEffect, useRef } from "react"
import { Parser } from "expr-eval"
import "./calculator.scss"

/* 
Group types:

Number groups: Can only contain numbers (unlimited). Must be separated by operators.
Operator groups: Can only contain +, *, /
Negative groups: Can only contain - (unlimited)
Special groups: Can only contain a math phrase like x^y, sqrt(x), log(x), ln(x)

1. On first input, create new group: [1]
2. Add new group to expression: [[1]]
3. If next input is same type, add it to the current group: [1, 2],
remove previous group from expression, and add new group
4. 

*/

export default function Calculator() {
	const [currentExpression, setCurrentExpression] = useState([])
	const [currentGroup, setCurrentGroup] = useState([0])
	const [lastInputType, setLastInputType] = useState()

	// Lookup table to convert words to numerals/symbols
	const mathLookup = {
		zero: {
			value: 0,
			type: "number",
		},
		one: {
			value: 1,
			type: "number",
		},
		two: {
			value: 2,
			type: "number",
		},
		three: {
			value: 3,
			type: "number",
		},
		four: {
			value: 4,
			type: "number",
		},
		five: {
			value: 5,
			type: "number",
		},
		six: {
			value: 6,
			type: "number",
		},
		seven: {
			value: 7,
			type: "number",
		},
		eight: {
			value: 8,
			type: "number",
		},
		nine: {
			value: 9,
			type: "number",
		},
		decimal: {
			value: ".",
			type: "number",
		},
		add: {
			value: "+",
			type: "basicOperator",
		},
		subtract: {
			value: "-",
			type: "basicOperator",
		},
		multiply: {
			value: "*",
			type: "basicOperator",
		},
		divide: {
			value: "/",
			type: "basicOperator",
		},
		equals: {
			value: "=",
			type: "basicOperator",
		},
		factorial: {
			value: "!",
			type: "basicOperator",
		},
		exponent: {
			value: "^",
			type: "basicOperator",
		},
		sqrt: {
			value: "sqrt(",
			type: "specialOperator",
		},
		log: {
			value: "log(",
			type: "specialOperator",
		},
		ln: {
			value: "ln(",
			type: "specialOperator",
		},

		leftParen: {
			value: "(",
			type: "paren",
		},
		rightParen: {
			value: ")",
			type: "paren",
		},
		pi: {
			value: Number(Math.PI.toPrecision(8)),
			type: "pi",
		},
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
		"p",
		"P",
		"l",
		"L",
		"n",
		"N",
		"(",
		")",
	]

	const easterEggArray = [
		"That's not a button!",
		"Funny, right?",
		"Never gonna give you up...",
		"You found the easter egg!",
		"Okay, it's a lame joke",
		"Stop clicking!",
		"You think you're pretty smart, don't you?",
		"Okay, you caught me--this button doesn't do anything.",
		"Have you ever seen a moose?",
		"A moose once bit my sister.",
		"What's your favorite color? Mine's #BADA55.",
	]

	function validateInput(group, input) {
		let valid = true

		if (input.type === "number") {
			if (validateNumberGroup(currentGroup, input) === false) {
				valid = false
			}
		}
		if (input.type === "symbol") {
			if (validateSymbolGroup(currentGroup, input) === false) {
				valid = false
			}
		}
		return valid
	}

	function validateNumberGroup(group, input) {
		let valid = true

		if (input.value === "." && group.find((element) => element === ".")) {
			valid = false
		}

		return valid
	}

	function validateSymbolGroup(group, input) {
		let valid = true
	}

	function validateZeros(group, input) {}

	function processInput(input) {
		if (!validateNumberGroup(currentGroup, input)) {
			return
		}

		if (currentGroup[0] === 0) {
			setCurrentGroup([input.value])
		} else if (input.type === lastInputType) {
			addToCurrentGroup(input.value)
		} else {
			createNewGroup(input)
		}
		setLastInputType(input.type)
	}

	function createNewGroup(input) {
		setCurrentExpression((previousCurrentExpression) => [
			...previousCurrentExpression,
			[],
		])
		setCurrentGroup([input.value])
	}

	function addToCurrentGroup(input) {
		setCurrentGroup((previousCurrentGroup) => [...previousCurrentGroup, input])
	}

	useEffect(() => {
		setCurrentExpression((previousCurrentExpression) => [
			...previousCurrentExpression.slice(0, -1),
			currentGroup,
		])
	}, [currentGroup])

	// Remove the last number/symbol from currentExpression
	function backspaceInput() {
		setCurrentExpression((previousCurrentExpression) =>
			previousCurrentExpression.slice(0, -1)
		)
	}

	// Wipe calculator for restart
	function resetCalculator() {
		setCurrentGroup([0])
		setCurrentExpression([0])
	}

	// Parse and evaluate currentExpression
	function solveExpression() {
		try {
			const result = parseFloat(
				Parser.evaluate(currentExpression.flat().join("")).toPrecision(8)
			)

			setCurrentExpression([result])
		} catch (err) {
			console.log(err)
		}
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
			processInput(mathLookup[input])
		} else {
			console.log("Not a valid input.")
		}
	}

	// Add keyboard event listener in useEffect
	useEffect(() => {
		function handleKeyboardInput(event) {
			if (event.key === "Backspace") {
				event.preventDefault()
				return backspaceInput()
			} else if (event.key.toLowerCase() === "c") {
				event.preventDefault()
				return resetCalculator()
			} else if (event.key === "Enter" || event.key === "=") {
				event.preventDefault()
				return solveExpression()
			} else if (allowedKeys.includes(event.key.toLowerCase())) {
				event.preventDefault()
				if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(event.key))) {
					addToCurrentExpression(Number(event.key))
				} else if (Object.keys(mathLookup).includes(event.key.toLowerCase())) {
					addToCurrentExpression(mathLookup[event.key.toLowerCase()])
				} else {
					addToCurrentExpression(event.key)
				}
			}
		}

		window.addEventListener("keydown", handleKeyboardInput)

		return () => {
			window.removeEventListener("keydown", handleKeyboardInput)
		}
	}, [currentExpression])

	function handleCalcULater() {
		console.log(Math.floor(Math.random() * easterEggArray.length))

		setCurrentExpression(
			easterEggArray[Math.floor(Math.random() * easterEggArray.length)]
		)
	}

	// Component that ensures calculator always scrolls down on overflow
	const AlwaysScrollToBottom = () => {
		const elementRef = useRef()
		useEffect(() => elementRef.current.scrollIntoView())
		return <div ref={elementRef} />
	}

	// On equals input, parse array according to order of operations
	return (
		<div className="calculator" id="calculator">
			<div className="display" id="display">
				{typeof currentExpression === "object"
					? currentExpression.flat().join("")
					: currentExpression}
				<AlwaysScrollToBottom />
			</div>
			<div className="button-container">
				<div className="top-buttons">
					<div className="calc-label" onClick={handleCalcULater}>
						CALC U LATER
					</div>
					<button className="top-button" id="clear" onClick={resetCalculator}>
						C
					</button>
					<button
						className="top-button"
						id="backspace"
						onClick={backspaceInput}
					>
						<i className={["fas", "fa-backspace"].join(" ")}></i>
					</button>
				</div>
				<div className="top-symbols">
					<button className="sym-button" id="pi" onClick={handleClickInput}>
						&#960;
					</button>
					<button className="sym-button" id="log" onClick={handleClickInput}>
						log
					</button>
					<button className="sym-button" id="ln" onClick={handleClickInput}>
						ln
					</button>
					<button
						className="sym-button"
						id="leftParen"
						onClick={handleClickInput}
					>
						(
					</button>
					<button
						className="sym-button"
						id="rightParen"
						onClick={handleClickInput}
					>
						)
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

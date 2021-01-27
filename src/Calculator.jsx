import React, { useState, useEffect, useRef, useCallback } from "react"
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
			type: "factorial",
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
	const keyboardLookup = {
		0: "zero",
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "nine",
		".": "decimal",
		"+": "add",
		"-": "subtract",
		"*": "multiply",
		x: "multiply",
		X: "multiply",
		"/": "divide",
		"=": "equals",
		Enter: "equals",
		"!": "factorial",
		"^": "exponent",
		Backspace: "backspace",
		c: "clear",
		C: "clear",
		p: "pi",
		P: "pi",
		l: "log",
		L: "log",
		n: "ln",
		N: "ln",
		"(": "leftParen",
		")": "rightParen",
	}

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

	// Run validator on every input to ensure it follows rules
	function validateInput(group, input) {
		let valid = true

		// Remove leading 0
		if (currentGroup[0] === 0) {
			setCurrentGroup(() => [input.value])
			valid = false
		}

		// validate number inputs
		if (input.type === "number") {
			// Make sure number groups don't contain more than one decimal
			if (input.value === "." && group.find((element) => element === ".")) {
				valid = false
				return
			}
		} else if (input.type === "basicOperator") {
			// Make sure basic operator groups only contain one operator
			// Except - signs, which can be unlimited
			if (
				lastInputType === "basicOperator" &&
				currentGroup.length >= 1 &&
				input.value !== "-"
			) {
				setCurrentGroup([input.value])
				valid = false
			}
		} else if (input.type === "specialOperator") {
			// if there isn't already a basic operator, insert a * before a special operator
			if (currentExpression.flat().slice(0, -1).type !== "basicOperator") {
				setCurrentGroup((previousCurrentGroup) => [
					...previousCurrentGroup,
					"*",
					input.value,
				])
			}
			valid = false
		}

		return valid
	}

	/* Receive input value from mathLookup, validate, 
	and either delegate to current group or create new group */
	function processInput(input) {
		if (
			!validateInput(currentGroup, input) &&
			!["backspace", "=", "clear"].includes(input.value)
		) {
			return
		}

		if (input.value === "=") {
			solveExpression()
		} else if (input.value === "backspace") {
			backspaceInput()
		} else if (input.value === "clear") {
			resetCalculator()
		} else if (input.type === lastInputType) {
			addToCurrentGroup(input.value)
			setLastInputType(input.type)
		} else {
			createNewGroup(input.value)
			setLastInputType(input.type)
		}
	}

	/* Create a blank array in currentExpression and set current group to input
	Blank group necessary because expression always truncates to replace last element
	with updated group */
	function createNewGroup(value) {
		setCurrentExpression((previousCurrentExpression) => [
			...previousCurrentExpression,
			[],
		])
		// Reset current group to only new input value
		setCurrentGroup(() => [value])
	}

	// Simply adds the input to the current group which triggers expression update
	function addToCurrentGroup(value) {
		setCurrentGroup((previousCurrentGroup) => [...previousCurrentGroup, value])
	}

	/* Set current expression to watch group for updates 
	On group update, replace previous last array with current group
	*/
	useEffect(() => {
		setCurrentExpression((previousCurrentExpression) => [
			...previousCurrentExpression.slice(0, -1),
			currentGroup,
		])
	}, [currentGroup])

	// Remove the last number/symbol from currentExpression
	function backspaceInput() {
		setCurrentExpression((previousCurrentExpression) =>
			previousCurrentExpression.flat().slice(0, -1)
		)
	}

	// Wipe calculator for restart
	function resetCalculator() {
		setCurrentGroup(() => [0])
		setCurrentExpression(() => [0])
	}

	// Parse and evaluate currentExpression
	function solveExpression() {
		console.log(currentExpression)
		console.log(currentGroup)
		if (lastInputType !== "basicOperator") {
			let result = Parser.evaluate(currentExpression.flat().join(""))

			// if (
			// 	currentExpression.flat()[currentExpression.length] === "." &&
			// 	!result
			// 		.toString()
			// 		.split("")
			// 		.some((element) => element === ".")
			// ) {
			// 	result = `${result.toString()}.0`
			// }

			// if (
			// 	!result
			// 		.toString()
			// 		.split("")
			// 		.some((element) => element === ".") &&
			// 	currentExpression.flat().some((element) => element === ".")
			// ) {
			// 	result = `${result.toString()}.0`
			// }
			// if (currentExpression.flat(2)[currentExpression.length - 1] === ".") {
			// 	result += ".0"
			// }

			setCurrentExpression([result])
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

		if (mathLookup[input] || input === "zero") {
			processInput(mathLookup[input])
		} else {
			console.log("Not a valid input.")
		}
	}

	// Add keyboard event listener in useEffect
	useEffect(() => {
		function handleKeyboardInput(event) {
			if (Object.keys(keyboardLookup).includes(event.key)) {
				event.preventDefault()

				if (["=", "Enter"].includes(event.key)) {
					solveExpression()
					return
				}

				const input = mathLookup[keyboardLookup[event.key]] ?? {
					value: keyboardLookup[event.key],
				}

				processInput(input)
			}
		}

		window.addEventListener("keydown", handleKeyboardInput)

		return () => {
			window.removeEventListener("keydown", handleKeyboardInput)
		}
	}, [currentExpression, currentGroup])

	function handleCalcULater() {
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

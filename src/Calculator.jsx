import React from "react"
import "./calculator.scss"

export default function Calculator() {
	return (
		<div className="calculator" id="calculator">
			<div className="display"></div>
			<div className="button-container">
				<div className="top-buttons">
					<div class="calc-label">CALC</div>
					<button className="top-button" id="C">
						C
					</button>
					<button className="top-button" id="backspace">
						B
					</button>
				</div>
				<div className="numpad">
					<button className="num-button" id="zero">
						0
					</button>
					<button className="num-button" id="one">
						1
					</button>
					<button className="num-button" id="two">
						2
					</button>
					<button className="num-button" id="three">
						3
					</button>
					<button className="num-button" id="four">
						4
					</button>
					<button className="num-button" id="five">
						5
					</button>
					<button className="num-button" id="six">
						6
					</button>
					<button className="num-button" id="seven">
						7
					</button>
					<button className="num-button" id="eight">
						8
					</button>
					<button className="num-button" id="!">
						!
					</button>
					<button className="num-button" id="0">
						0
					</button>
					<button className="num-button" id=".">
						.
					</button>
				</div>
				<div className="sympad">
					<button className="sym-button" id="exp">
						x2
					</button>
					<button className="sym-button" id="sqrt">
						sq
					</button>
					<button className="sym-button" id="multiply">
						x
					</button>
					<button className="sym-button" id="divide">
						/
					</button>
					<button className="sym-button" id="add">
						+
					</button>
					<button className="sym-button" id="subtract">
						-
					</button>
					<button className="sym-button" id="equals">
						=
					</button>
				</div>
			</div>
		</div>
	)
}

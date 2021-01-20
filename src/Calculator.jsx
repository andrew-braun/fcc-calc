import React from "react"
import "./calculator.scss"

export default function Calculator() {
	return (
		<div className="calculator" id="calculator">
			<div className="display"></div>
			<div className="button-container">
				<div className="top-buttons">
					<div className="calc-label">CALC</div>
					<button className="top-button" id="clear">
						C
					</button>
					<button className="top-button" id="backspace">
						B
					</button>
				</div>
				<div className="numpad">
					<button className="num-button" id="nine">
						9
					</button>
					<button className="num-button" id="eight">
						8
					</button>
					<button className="num-button" id="seven">
						7
					</button>
					<button className="num-button" id="six">
						6
					</button>
					<button className="num-button" id="five">
						5
					</button>
					<button className="num-button" id="four">
						4
					</button>
					<button className="num-button" id="three">
						3
					</button>
					<button className="num-button" id="two">
						2
					</button>
					<button className="num-button" id="one">
						1
					</button>
					<button className="num-button" id="factorial">
						!
					</button>
					<button className="num-button" id="zero">
						0
					</button>
					<button className="num-button" id="decimal">
						.
					</button>
				</div>
				<div className="sympad">
					<button className="sym-button" id="exp">
						x<sup>2</sup>
					</button>
					<button className="sym-button" id="sqrt">
						&#8730;
					</button>
					<button className="sym-button" id="multiply">
						&#215;
					</button>
					<button className="sym-button" id="divide">
						&#247;
					</button>
					<button className="sym-button" id="add">
						&#43;
					</button>
					<button className="sym-button" id="subtract">
						&#8722;
					</button>
					<button className="sym-button" id="equals">
						&#61;
					</button>
				</div>
			</div>
		</div>
	)
}

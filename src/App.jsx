import React from "react"
import ReactDOM from "react-dom"
import Calculator from "./Calculator"
import "./styles/global.css"
import "./app.scss"

export default function App() {
	return (
		<div className="main-container">
			<header className="main-header">
				<h1>Calc U Later!</h1>
			</header>
			<Calculator />
		</div>
	)
}

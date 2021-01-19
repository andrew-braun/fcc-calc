import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./Calculator";

function App() {
	return <Calculator />;
}

ReactDOM.render(<App />, document.querySelector("#root"));

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement

if (import.meta.hot) {
	import.meta.hot.accept();
}

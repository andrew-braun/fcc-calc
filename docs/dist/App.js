import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import Calculator from "./Calculator.js";
import "./styles/global.css.proxy.js";
import "./app.css.proxy.js";
export default function App() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "main-container"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "main-header"
  }, /* @__PURE__ */ React.createElement("h1", null, "Calc U Later!")), /* @__PURE__ */ React.createElement(Calculator, null));
}

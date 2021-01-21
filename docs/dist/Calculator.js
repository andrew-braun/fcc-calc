import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import "./calculator.css.proxy.js";
export default function Calculator() {
  const [currentExpression, setCurrentExpression] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
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
    exponent: "^"
  };
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
    "C"
  ];
  function backspaceInput() {
    setCurrentExpression((previousCurrentExpression) => previousCurrentExpression.slice(0, -1));
  }
  function resetCalculator() {
    setCurrentExpression([]);
    setCurrentTotal(0);
  }
  function solveExpression() {
    console.log(currentExpression);
  }
  function handleClickInput(event) {
    const input = event.target.id;
    if (mathLookup[input] || input === "zero") {
      setCurrentExpression((previousCurrentExpression) => [
        ...previousCurrentExpression,
        mathLookup[input]
      ]);
    } else {
      console.log("Not a valid input.");
    }
  }
  useEffect(() => {
    function handleKeyboardInput(event) {
      if (event.key === "Backspace") {
        event.preventDefault();
        backspaceInput();
      } else if (event.key.toLowerCase() === "c") {
        resetCalculator();
      } else if (allowedKeys.includes(event.key)) {
        setCurrentExpression((previousCurrentExpression) => [
          ...previousCurrentExpression,
          event.key
        ]);
      } else {
        console.log("Not a valid input.");
      }
    }
    window.addEventListener("keydown", handleKeyboardInput);
    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: "calculator",
    id: "calculator"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "display",
    id: "display"
  }, currentExpression.join("")), /* @__PURE__ */ React.createElement("div", {
    className: "button-container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "top-buttons"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "calc-label"
  }, "CALC"), /* @__PURE__ */ React.createElement("button", {
    className: "top-button",
    id: "clear",
    onClick: resetCalculator
  }, "C"), /* @__PURE__ */ React.createElement("button", {
    className: "top-button",
    id: "backspace",
    onClick: backspaceInput
  }, "B")), /* @__PURE__ */ React.createElement("div", {
    className: "numpad"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "nine",
    onClick: handleClickInput
  }, "9"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "eight",
    onClick: handleClickInput
  }, "8"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "seven",
    onClick: handleClickInput
  }, "7"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "six",
    onClick: handleClickInput
  }, "6"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "five",
    onClick: handleClickInput
  }, "5"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "four",
    onClick: handleClickInput
  }, "4"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "three",
    onClick: handleClickInput
  }, "3"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "two",
    onClick: handleClickInput
  }, "2"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "one",
    onClick: handleClickInput
  }, "1"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "factorial",
    onClick: handleClickInput
  }, "!"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "zero",
    onClick: handleClickInput
  }, "0"), /* @__PURE__ */ React.createElement("button", {
    className: "num-button",
    id: "decimal",
    onClick: handleClickInput
  }, ".")), /* @__PURE__ */ React.createElement("div", {
    className: "sympad"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "exp",
    onClick: handleClickInput
  }, "x", /* @__PURE__ */ React.createElement("sup", null, "2")), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "sqrt",
    onClick: handleClickInput
  }, "\u221A"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "multiply",
    onClick: handleClickInput
  }, "\xD7"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "divide",
    onClick: handleClickInput
  }, "\xF7"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "add",
    onClick: handleClickInput
  }, "+"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "subtract",
    onClick: handleClickInput
  }, "\u2212"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "equals",
    onClick: solveExpression
  }, "="))));
}

import React, {useState, useEffect, useRef} from "../_snowpack/pkg/react.js";
import {Parser} from "../_snowpack/pkg/expr-eval.js";
import "./calculator.css.proxy.js";
export default function Calculator() {
  const [currentExpression, setCurrentExpression] = useState([0]);
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
    sqrt: "sqrt ",
    s: "sqrt ",
    log: "log(",
    l: "log(",
    n: "ln(",
    ln: "ln(",
    "(": "(",
    ")": ")",
    rightParen: ")",
    leftParen: "(",
    pi: Number(Math.PI.toPrecision(8)),
    p: Number(Math.PI.toPrecision(8))
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
    "C",
    "p",
    "P",
    "l",
    "L",
    "n",
    "N",
    "(",
    ")"
  ];
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
    "What's your favorite color? Mine's #BADA55."
  ];
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return /* @__PURE__ */ React.createElement("div", {
      ref: elementRef
    });
  };
  function addToCurrentExpression(item) {
    try {
      const lastIndex = currentExpression.length - 1;
      const alphabeticMath = ["pi", "log(", "ln(", "(", ")"];
      if (currentExpression[0] === 0 && item !== 0 || easterEggArray.includes(currentExpression)) {
        setCurrentExpression([]);
      }
      if (currentExpression[lastIndex] === 0 && item === 0) {
        return;
      }
      if (typeof currentExpression[lastIndex] !== "number" && typeof item !== "number" && !alphabeticMath.includes(currentExpression[lastIndex]) && !alphabeticMath.includes(item)) {
        console.log(!["pi", "log(", "ln(", "(", ")"].includes(item));
        const newCurrentExpression = currentExpression.slice(0, currentExpression.length - 1);
        setCurrentExpression([...newCurrentExpression, item]);
      } else if (["log(", "ln("].includes(item) && typeof currentExpression[lastIndex] === "number") {
        setCurrentExpression((previousCurrentExpression) => [
          ...previousCurrentExpression,
          `*${item}`
        ]);
      } else {
        setCurrentExpression((previousCurrentExpression) => [
          ...previousCurrentExpression,
          item
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function backspaceInput() {
    setCurrentExpression((previousCurrentExpression) => previousCurrentExpression.slice(0, -1));
  }
  function resetCalculator() {
    setCurrentExpression([0]);
  }
  function solveExpression() {
    try {
      const result = parseFloat(Parser.evaluate(currentExpression.join("")).toPrecision(8));
      console.log(result);
      setCurrentExpression([result]);
    } catch (err) {
      console.log(err);
    }
  }
  function handleClickInput(event) {
    const input = event.target.id;
    if (input === "equals") {
      solveExpression();
    } else if (mathLookup[input] || input === "zero") {
      addToCurrentExpression(mathLookup[input]);
    } else {
      console.log("Not a valid input.");
    }
  }
  useEffect(() => {
    function handleKeyboardInput(event) {
      if (event.key === "Backspace") {
        event.preventDefault();
        return backspaceInput();
      } else if (event.key.toLowerCase() === "c") {
        event.preventDefault();
        return resetCalculator();
      } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        return solveExpression();
      } else if (allowedKeys.includes(event.key.toLowerCase())) {
        event.preventDefault();
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(event.key))) {
          addToCurrentExpression(Number(event.key));
        } else if (Object.keys(mathLookup).includes(event.key.toLowerCase())) {
          addToCurrentExpression(mathLookup[event.key.toLowerCase()]);
        } else {
          addToCurrentExpression(event.key);
        }
      }
    }
    window.addEventListener("keydown", handleKeyboardInput);
    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, [currentExpression]);
  function handleCalcULater() {
    console.log(Math.floor(Math.random() * easterEggArray.length));
    setCurrentExpression(easterEggArray[Math.floor(Math.random() * easterEggArray.length)]);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "calculator",
    id: "calculator"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "display",
    id: "display"
  }, typeof currentExpression === "object" ? currentExpression.join("") : currentExpression, /* @__PURE__ */ React.createElement(AlwaysScrollToBottom, null)), /* @__PURE__ */ React.createElement("div", {
    className: "button-container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "top-buttons"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "calc-label",
    onClick: handleCalcULater
  }, "CALC U LATER"), /* @__PURE__ */ React.createElement("button", {
    className: "top-button",
    id: "clear",
    onClick: resetCalculator
  }, "C"), /* @__PURE__ */ React.createElement("button", {
    className: "top-button",
    id: "backspace",
    onClick: backspaceInput
  }, /* @__PURE__ */ React.createElement("i", {
    className: ["fas", "fa-backspace"].join(" ")
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "top-symbols"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "pi",
    onClick: handleClickInput
  }, "\u03C0"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "log",
    onClick: handleClickInput
  }, "log"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "ln",
    onClick: handleClickInput
  }, "ln"), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "leftParen",
    onClick: handleClickInput
  }, "("), /* @__PURE__ */ React.createElement("button", {
    className: "sym-button",
    id: "rightParen",
    onClick: handleClickInput
  }, ")")), /* @__PURE__ */ React.createElement("div", {
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
    id: "exponent",
    onClick: handleClickInput
  }, "x", /* @__PURE__ */ React.createElement("sup", null, "y")), /* @__PURE__ */ React.createElement("button", {
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

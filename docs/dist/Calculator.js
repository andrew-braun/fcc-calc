import React, {useState, useEffect, useRef} from "../_snowpack/pkg/react.js";
import {Parser} from "../_snowpack/pkg/expr-eval.js";
import "./calculator.css.proxy.js";
export default function Calculator() {
  const [currentExpression, setCurrentExpression] = useState([]);
  const [currentGroup, setCurrentGroup] = useState([0]);
  const [lastInputType, setLastInputType] = useState();
  const mathLookup = {
    zero: {
      value: 0,
      type: "number"
    },
    one: {
      value: 1,
      type: "number"
    },
    two: {
      value: 2,
      type: "number"
    },
    three: {
      value: 3,
      type: "number"
    },
    four: {
      value: 4,
      type: "number"
    },
    five: {
      value: 5,
      type: "number"
    },
    six: {
      value: 6,
      type: "number"
    },
    seven: {
      value: 7,
      type: "number"
    },
    eight: {
      value: 8,
      type: "number"
    },
    nine: {
      value: 9,
      type: "number"
    },
    decimal: {
      value: ".",
      type: "number"
    },
    add: {
      value: "+",
      type: "basicOperator"
    },
    subtract: {
      value: "-",
      type: "basicOperator"
    },
    multiply: {
      value: "*",
      type: "basicOperator"
    },
    divide: {
      value: "/",
      type: "basicOperator"
    },
    equals: {
      value: "=",
      type: "basicOperator"
    },
    factorial: {
      value: "!",
      type: "basicOperator"
    },
    exponent: {
      value: "^",
      type: "basicOperator"
    },
    sqrt: {
      value: "sqrt(",
      type: "specialOperator"
    },
    log: {
      value: "log(",
      type: "specialOperator"
    },
    ln: {
      value: "ln(",
      type: "specialOperator"
    },
    leftParen: {
      value: "(",
      type: "paren"
    },
    rightParen: {
      value: ")",
      type: "paren"
    },
    pi: {
      value: Number(Math.PI.toPrecision(8)),
      type: "pi"
    }
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
  function validateInput(group, input) {
    let valid = true;
    if (input.type === "number") {
      if (input.value === "." && group.find((element) => element === ".")) {
        valid = false;
      }
    } else if (input.type === "basicOperator") {
      console.log("basicOperator");
      if (lastInputType === "basicOperator" && currentGroup.length >= 1 && input.value !== "-") {
        setCurrentGroup([input.value]);
        valid = false;
      }
    } else if (input.type === "specialOperator") {
      console.log(currentExpression.flat().slice(0, -1).type !== "basicOperator");
      console.log("You're special!");
      if (currentExpression.flat().slice(0, -1).type !== "basicOperator") {
        console.log("Ya not basic");
        setCurrentGroup((previousCurrentGroup) => [
          ...previousCurrentGroup,
          "*",
          input.value
        ]);
      }
      valid = false;
    }
    return valid;
  }
  function processInput(input) {
    if (!validateInput(currentGroup, input)) {
      return;
    }
    if (currentGroup[0] === 0) {
      setCurrentGroup([input.value]);
    } else if (input.type === lastInputType) {
      addToCurrentGroup(input.value);
    } else {
      createNewGroup(input);
    }
    setLastInputType(input.type);
  }
  function createNewGroup(input) {
    setCurrentExpression((previousCurrentExpression) => [
      ...previousCurrentExpression,
      []
    ]);
    setCurrentGroup([input.value]);
  }
  function addToCurrentGroup(input) {
    setCurrentGroup((previousCurrentGroup) => [...previousCurrentGroup, input]);
  }
  useEffect(() => {
    setCurrentExpression((previousCurrentExpression) => [
      ...previousCurrentExpression.slice(0, -1),
      currentGroup
    ]);
  }, [currentGroup]);
  function backspaceInput() {
    setCurrentExpression((previousCurrentExpression) => previousCurrentExpression.slice(0, -1));
  }
  function resetCalculator() {
    setCurrentGroup([0]);
    setCurrentExpression([0]);
  }
  function solveExpression() {
    try {
      const result = parseFloat(Parser.evaluate(currentExpression.flat().join("")).toPrecision(8));
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
      processInput(mathLookup[input]);
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
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return /* @__PURE__ */ React.createElement("div", {
      ref: elementRef
    });
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "calculator",
    id: "calculator"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "display",
    id: "display"
  }, typeof currentExpression === "object" ? currentExpression.flat().join("") : currentExpression, /* @__PURE__ */ React.createElement(AlwaysScrollToBottom, null)), /* @__PURE__ */ React.createElement("div", {
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

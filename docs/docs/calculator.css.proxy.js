// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".calculator {\n  min-width: 28rem;\n  max-height: 100%;\n  background: var(--dark-1);\n  border-radius: 0.5rem;\n}\n\n.display {\n  background: var(--bright-2);\n  min-height: 10rem;\n  height: clamp(10rem, 22%, auto);\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n\n.button-container {\n  display: grid;\n  grid-template-columns: 60% 40%;\n  grid-template-areas: \"top-row top-row\" \"numpad sympad\";\n  height: clamp(280px, 54rem, auto);\n  margin: -0.1rem;\n}\n.button-container .top-buttons {\n  grid-area: top-row;\n  display: grid;\n  grid-template-columns: repeat(5, 20%);\n  min-height: 5rem;\n}\n.button-container .top-buttons .top-button {\n  grid-row: 1;\n  border: none;\n  margin: 0 0.1rem;\n}\n.button-container .top-buttons .calc-label {\n  grid-column: 1/3;\n  grid-row: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0.5rem 0.3rem;\n  border: 2px solid var(--bright-2);\n  color: white;\n  border-radius: 1rem;\n}\n.button-container .top-buttons #C {\n  grid-column: 3/5;\n  background: var(--bright-1);\n}\n.button-container .top-buttons #backspace {\n  grid-column: 5;\n  background: var(--bright-3);\n}\n.button-container .numpad {\n  grid-area: numpad;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(4, 5rem);\n  min-height: 100%;\n}\n.button-container .numpad .num-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-width: 2rem;\n  min-height: 2rem;\n  margin: 0.1rem;\n  background: var(--light-1);\n  border: none;\n}\n.button-container .numpad #factorial {\n  border-radius: 0 0 0 0.5rem;\n}\n.button-container .sympad {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n.button-container .sympad .sym-button {\n  border: none;\n  margin: 0.1rem;\n  background: var(--light-1);\n  filter: brightness(1.08);\n}\n.button-container .sympad #equals {\n  grid-column: 2;\n  grid-row: 3/5;\n  background: var(--bright-2);\n  border-radius: 0 0 0.5rem 0;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
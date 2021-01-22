// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ":root {\r\n\t--dark-1: hsla(264, 27%, 11%, 1);\r\n\t--dark-2: hsla(0, 0%, 47%, 1);\r\n\t--light-1: hsla(0, 0%, 77%, 1);\r\n\t--light-1-t: hsla(0, 0%, 77%, 0.5);\r\n\t--light-2: hsla(0, 0%, 92%, 1);\r\n\t--bright-1: hsla(5, 40%, 52%, 1);\r\n\t--bright-2: hsla(209, 58%, 49%, 1);\r\n\t--bright-3: hsla(42, 100%, 44%, 1);\r\n}\r\n\r\n* {\r\n\tbox-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n\tfont-size: 10px;\r\n}\r\n\r\nbody {\r\n\tfont-family: \"Space Mono\", monospace;\r\n\tmargin: 0;\r\n\tfont-size: 1.6rem;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
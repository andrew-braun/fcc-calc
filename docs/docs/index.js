import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import Calculator from "./Calculator.js";
function App() {
  return /* @__PURE__ */ React.createElement(Calculator, null);
}
ReactDOM.render(/* @__PURE__ */ React.createElement(App, null), document.querySelector("#root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}

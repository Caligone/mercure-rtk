import React from "react";
import * as ReactDOM from "react-dom/client";

import "./styles/app.css";

const rootDomElement = document.createElement("div");
rootDomElement.id = "root";
document.body.appendChild(rootDomElement);

const root = ReactDOM.createRoot(rootDomElement);
root.render(<h1>Hello world</h1>);

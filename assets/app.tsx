import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "./styles/app.css";
import { useGetNumberQuery, useIncrementNumberMutation } from "./api";

const NumberDisplay: React.FC = () => {
  const { data: number } = useGetNumberQuery({});
  return <div>Current Number: {number}</div>;
};

const IncrementButton: React.FC = () => {
  const [increment] = useIncrementNumberMutation();
  return <button onClick={() => increment({})}>Increment</button>;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <h1>Hello world</h1>
      <NumberDisplay />
      <IncrementButton />
    </Provider>
  );
};

const rootDomElement = document.createElement("div");
rootDomElement.id = "root";
document.body.appendChild(rootDomElement);

const root = ReactDOM.createRoot(rootDomElement);
root.render(<App />);

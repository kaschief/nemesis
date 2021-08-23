import React from "react";
import "./App.css";
import { AutoComplete } from "./components/Autocomplete";
import { fruits } from "./fruits";

function App() {
  return (
    <div className="App">
      <div>This is the AutoComplete</div>
      <AutoComplete suggestions={fruits} placeholder="What would you like?" />
    </div>
  );
}

export default App;

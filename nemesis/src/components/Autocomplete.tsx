import React, { useState, useEffect } from "react";
import { fruits } from "../fruits";
import { useIsMount } from "../useIsMount";

export const AutoComplete: React.FC = () => {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value.toLowerCase());
    setIsActive(true);
  };

  const isMount: boolean = useIsMount();

  useEffect(() => {
    if (!isMount) {
      const filtered: string[] = fruits
        .map((fruit) => fruit.toLowerCase())
        .filter((fruit) => fruit.includes(input));
      setFilteredOptions(filtered);
    }
  }, [isMount, input]);

  return (
    <div>
      <input
        name="search"
        placeholder="search"
        type="text"
        value={input}
        onChange={handleChange}
      />

      {filteredOptions.map((fruit: string, index: number) => {
        return <div key={index}>{fruit}</div>;
      })}
    </div>
  );
};

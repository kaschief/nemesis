import React, { useState, useEffect } from "react";
import { useIsMount } from "../useIsMount";

interface Props {
  suggestions: string[];
  placeholder: string;
}

export const AutoComplete: React.FC<Props> = ({ suggestions, placeholder }) => {
  const [input, setInput] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([""]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value.toLowerCase());
    setDisplayedText(e.target.value);

    setShowSuggestions(true);
  };

  const hoverChange = (e: React.MouseEvent<HTMLDivElement>): void => {
    const element = e.target as HTMLElement;
    const elementText: unknown = element.getAttribute("data-name");
    const activeIndex: unknown = element.getAttribute("data-id");

    setDisplayedText(elementText as string);
    setSelectedIndex(activeIndex as number);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const element = e.target as HTMLElement;
    const elementText: string = element.children[0].innerHTML;

    setInput(elementText);
    setDisplayedText(elementText);
    setFilteredOptions([]);
    setTimeout(() => {
      setShowSuggestions(false);
    }, 300);
  };

  const handleOptionSelect = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): JSX.Element | undefined => {
    if (e.code === "Enter") {
      setInput(filteredOptions[selectedIndex]);
      setSelectedIndex(0);
      setTimeout(() => {
        setShowSuggestions(false);
      }, 300);
    } else if (e.code === "ArrowUp") {
      if (selectedIndex === 0) {
        return;
      }
      setSelectedIndex(selectedIndex - 1);
      setDisplayedText(filteredOptions[selectedIndex - 1]);
    } else if (e.code === "ArrowDown") {
      if (selectedIndex - 1 === filteredOptions.length) {
        return;
      } else if (selectedIndex + 1 < filteredOptions.length) {
        setSelectedIndex(selectedIndex + 1);
        setDisplayedText(filteredOptions[selectedIndex + 1]);
      }
    }
  };

  const isMount: boolean = useIsMount();

  useEffect(() => {
    if (!isMount) {
      const filtered: string[] = suggestions
        .map((suggestion) => suggestion.toLowerCase())
        .filter((suggestion) => suggestion.includes(input));
      setFilteredOptions(filtered);
    }
  }, [isMount, input, suggestions]);

  const Suggestions: React.FC = (): JSX.Element => {
    return (
      <>
        {filteredOptions.map((suggestion: string, index: number) => {
          if (suggestion.indexOf(input) > -1 && input.length > 0) {
            const word = suggestion;
            const val = `${word.slice(
              0,
              word.indexOf(input)
            )}<b>${input}</b>${word.slice(
              word.indexOf(input) + input.length,
              word.length
            )}`;

            return (
              <div
                className={`list-item ${
                  index === selectedIndex ? "selected" : ""
                }`}
                key={index}
                onMouseEnter={hoverChange}
                onClick={handleClick}
                data-id={index}
                data-name={suggestion}
              >
                <p dangerouslySetInnerHTML={{ __html: val }}></p>
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <div className="autocomplete">
      <input
        name="search"
        placeholder={placeholder}
        type="text"
        value={displayedText}
        onChange={handleChange}
        onKeyDown={handleOptionSelect}
      />

      {showSuggestions && <Suggestions />}
    </div>
  );
};

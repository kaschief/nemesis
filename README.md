# nemesis

### Description

This project is an Autocomplete component, built in React TypeScript. No dependencies or additional libraries were used.

The component allows the user to input a search term, and presents a series of suggestions below the input field with options that match the user's query. The portion of the suggestion that matches the input is bolded as the user types, and the top selection is highlighted. The user is further able to use the up and down  keys to scroll through (or hover over each suggestion) to complete the partially input term, and enter or click to confirm the suggestion as an input query.

The component is intended to be versatile, and location-agnostic, and so takes just the props necessary for its functioning: an array of suggestion and the input placeholder text.

Due to contraints in the time allotted for this project, some additional enhancements were not started. These would have been:
	- implementing a solution to scroll into view the matched items that are further below in scrollable containers.
	- adding tests for the methods used in the Autocomplete component
	- additional designs and animations
	
	
The projeect can be started by:

`cd nemesis`
<br>
`yarn start`


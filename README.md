# REST Countries API with Color Theme Switcher

A responsive web application that fetches, filters, and displays world country data utilizing the REST Countries API with an offline fallback mechanism and persistent dark mode styling.

## Links : https://imaginative-faun-40f597.netlify.app
- 

## Features
- **Dynamic Data Fetching:** Fetches all country records asynchronously with a local fallback (`data.json`) inside a defensive error-handling block.
- **Real-Time Search:** Filters countries instantly by common name.
- **Region Filtering:** Dropdown selector to filter countries by geographical region.
- **Detailed Country View:** Displays comprehensive national statistics, including native names, currencies, languages, top-level domains, and interactive border country tags.
- **Border Country Navigation:** Dynamic routing directly between neighboring countries via border tag buttons.
- **Color Theme Toggle:** Light and dark mode support persisted in browser `localStorage`.
- **Accessibility:** Keyboard navigable cards, semantic HTML5 structure, and ARIA labels.

## Built With
- Semantic HTML5 markup
- CSS3 Custom Properties (CSS variables for theming), Flexbox, and CSS Grid
- Modern Vanilla JavaScript (ES6+, `async/await`, Fetch API, DOM manipulation)
- LocalStorage Web API


## Project Reflection

### 1. Challenges Encountered
- **Inconsistent API Data:** When fetching data for all countries, I noticed that the properties were not always structured the same way. Some countries had currencies or languages formatted as arrays, while others had them as objects. Also, island countries like Japan or Australia didn't have border arrays, which caused errors when trying to read them.
- **Timing and Rendering Bugs:** At first, my cards weren't showing up because of small syntax bugs—like a missing parameter inside my loop and an accidental space in my optional chaining operator (`? .`). Debugging these in the browser console showed me how sensitive JavaScript execution is when handling asynchronous data.

### 2. How I Solved Them
- **Dynamic Checks and Fallbacks:** I used `Array.isArray()` and `Object.values()` so the code checks the data format before trying to display it. For borders, I added a condition to check if the borders array actually has items, and if not, it cleanly displays "None".
- **Defensive Fetching:** I wrapped my API call in a `try...catch` block. If the live REST Countries API has any network issues, the app immediately catches the error and loads the local `data.json` file as a backup so the site never stays blank.
- **Clean Config Separation:** I kept my API URL inside a separate `js/config.js` file and added it to `.gitignore`, while providing a `js/config.example.js` so secret keys or local configs are never pushed to GitHub.

### 3. Future Improvements
- **Refactoring to React:** As we move into React next in class, I want to rebuild this project using components and state hooks instead of manually updating the DOM with `innerHTML`.
- **URL Routing:** I would like to add real page routes (like `/country/albania`) so users can share a direct link to a specific country's detail page.
- **Search Optimization:** Adding a small debounce to the search input would improve performance when typing quickly across large datasets.
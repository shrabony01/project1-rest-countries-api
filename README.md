# REST Countries API with Color Theme Switcher

A responsive web application that fetches, filters, and displays world country data utilizing the REST Countries API with an offline fallback mechanism and persistent dark mode styling.

## Links
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

## Personal Reflection

### What I Learned
Through this project, I deepened my understanding of handling asynchronous JavaScript workflows, parsing nested API response structures (such as localized native names and currency objects), and building state-driven user interfaces without heavy frontend frameworks. I also implemented defensive coding patterns—such as handling network drops via local JSON fallbacks and structuring configuration files (`js/config.js`) to adhere to Git security best practices.

### Challenges & Solutions
1. **Nested Data Parsing:** Some countries format currencies or languages as arrays, while others format them as key-value objects. I resolved this by checking data structures dynamically using `Array.isArray()` and `Object.values()`.
2. **Missing Properties:** Island nations lack land borders. I implemented conditional rendering so the application displays "None" cleanly rather than breaking on empty arrays.

# JavaScript Amazon E-Commerce Project

A vanilla JavaScript e-commerce application built as a learning project. Demonstrates modular architecture, state management, and DOM manipulation.

**Live demo:** https://phantomruffy.great-site.net/

## Overview

Functional e-commerce app with product catalog, shopping cart, checkout, and order tracking. Built with ES6 modules, localStorage persistence, and Jasmine testing.

## Features

* Product catalog with ratings and images
* Shopping cart with localStorage persistence
* Multi-page checkout workflow
* Order history and tracking
* Responsive design
* Unit tests for cart logic and utilities

## Tech Stack

* **Frontend:** HTML5, CSS3, ES6+ JavaScript (modules, classes)
* **Storage:** Browser localStorage (JSON serialization)
* **Testing:** Jasmine 5.1.1
* **Deployment:** Netlify

## Project Structure

```
scripts/           # Page logic & rendering
data/              # State management (cart, products, orders)
styles/            # CSS (shared + page-specific)
tests/             # Jasmine test suite
images/            # Product images and icons
```

## Key Implementation Details

**Modular Architecture:**

* Data modules manage state (cart, products)
* Script modules handle rendering and events
* Separation allows testing logic independently of DOM

**State Persistence:**

* Cart stored in localStorage as JSON
* `loadFromStorage()` initializes cart on page load
* `saveToStorage()` called after every cart modification

**Product Types:**

* Base `Product` class with `Clothing` and `Appliance` subclasses
* Factory pattern instantiates correct class during product loading
* Each type renders custom extra info (size charts, warranties)

**Event-Driven Rendering:**

* Render HTML to string
* Attach event listeners to newly created elements
* On interaction: update data → call saveToStorage() → re-render

**Asynchronous Loading:**

* Checkout page uses async/await to coordinate product and cart loading
* Try/catch/finally ensures rendering happens even on errors

## What I Learned

* ES6 modules and browser module resolution (`.js` extensions required)
* Class inheritance and polymorphism with Product subclasses
* localStorage API and JSON serialization for persistence
* Jasmine testing with spyOn and localStorage mocking
* Event delegation and data attributes for event targeting
* Handling race conditions in asynchronous data loading
* Test isolation: why each test needs clean state (beforeEach hooks)

## Common Issues & Fixes

**MIME Type Error:** Missing `.js` extension on module imports

```javascript
// ❌ Wrong
import { func } from "./module"
// ✅ Correct
import { func } from "./module.js"
```

**Favicon 404:** Add favicon link to HTML

```html
<link rel="icon" href="images/icons/amazon-favicon.png">
```

**localStorage Mocking Fails:** Spies must be set up before cart initialization, and old storage data must be cleared between tests

```javascript
beforeEach(() => localStorage.clear());
spyOn(localStorage, "getItem").and.callFake(...);
loadFromStorage();  // Call AFTER spy setup
```

## How to Run

### Prerequisites

* Modern browser (Chrome, Firefox, Safari, Edge)
* Local HTTP server (required for ES6 modules)

### Setup

1. Clone repository:

```bash
git clone https://github.com/PhantomRuffy/javascript-amazon-project.git
cd javascript-amazon-project
```

2. Start local server:

```bash
python -m http.server 8000
# or: npx http-server
# or: VS Code Live Server extension
```

3. Open `http://localhost:8000`

### Running Tests

Navigate to `http://localhost:8000/tests/tests.html` (use Chrome/Chromium)

## Usage

1. Browse products on main page
2. Select quantity and click "Add to Cart"
3. Click "Cart" to go to checkout
4. Review order and complete (simulated)
5. View order history in "Orders" page

## Trade-Offs & Limitations

* **localStorage only:** Works for this project but doesn't persist across devices or sync browser tabs. Production would use backend database.
* **XHR instead of Fetch:** Course uses XMLHttpRequest; modern code would use Fetch API with async/await
* **Callback + Promise mix:** Checkout page mixes callbacks and async/await; full refactor would use pure Promises
* **Limited test coverage:** UI rendering functions lack tests due to DOM mocking complexity

## Possible Improvements

* Backend API integration (Node.js/Express)
* User authentication system
* Payment processing
* Product search/filtering
* User reviews
* Order status notifications

## Browser Support

✅ Chrome/Edge/Firefox/Safari

❌ IE11 (requires ES6)

---

**GitHub:** https://github.com/PhantomRuffy/javascript-amazon-project

**Author:** Francesco (PhantomRuffy)

# JavaScript Amazon Project

A full-stack e-commerce application built with vanilla JavaScript, HTML, and CSS. This project was developed as part of a comprehensive web development course and demonstrates core concepts in front-end architecture, state management, and user interaction patterns.

## Overview

This is a functional e-commerce application that simulates the core features of an online shopping platform. It showcases DOM manipulation, event handling, localStorage for persistent data, and modular JavaScript organization—all fundamental skills for modern web development.

Note: This project uses JavaScript modules (ES6 imports) which require a local server to function properly due to browser security restrictions.

## Features

- **Product Catalog**: Browse product listings with details and images
- **Shopping Cart**: Add and remove items with real-time total calculation
- **Persistent Storage**: Cart data preserved using browser localStorage
- **Checkout Process**: Review cart and complete order workflow
- **Order History**: View all completed orders with details
- **Order Tracking**: Monitor order status and delivery information
- **Responsive Design**: Functional interface across different screen sizes

## Project Structure

```
javascript-amazon-project/
├── index.html           # Main product catalog page
├── checkout.html         # Checkout and order review page
├── orders.html           # Order history page
├── tracking.html         # Order tracking page
├── backend/              # Backend logic and utilities
├── data/                 # Product and order data
├── scripts/              # JavaScript modules
├── styles/               # CSS stylesheets
└── images/               # Product and UI images
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Live Server (required due to module imports and CORS restrictions)
  - VS Code Live Server extension, or
  - Python: `python -m http.server 8000`
  - Node.js: `npx http-server`

### Installation

1. Clone the repository:

```bash
git clone https://github.com/PhantomRuffy/javascript-amazon-project.git
cd javascript-amazon-project
```

2. Start a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

3. Open in your browser at `http://localhost:8000` (or the port specified by your server)

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser localStorage for persistent data
- **Architecture**: Modular JavaScript with separate concerns

## Usage

### Browsing Products

- Start on index.html to view available products
- Click on a product to see more details
- Adjust quantity and add to cart

### Adding to Cart

- Use the "Add to Cart" button on product listings
- Cart data persists even after browser refresh via localStorage

### Checkout

- Navigate to checkout.html to review your cart
- Review items, quantities, and pricing
- Complete the order to proceed

### Viewing Orders

- Visit orders.html to see your order history
- Each order displays date, items, and total price

### Tracking Orders

- Use tracking.html to monitor delivery status
- View estimated delivery dates and current location

## Architecture

### Key Modules

The codebase is organized into functional modules:

**Backend** (backend/)

- Order processing and management
- Cart calculations and validation
- Data handling utilities

**Data** (data/)

- Product catalog information
- Order records
- Pricing data

**Scripts** (scripts/)

- DOM manipulation and rendering
- Event handlers and listeners
- Business logic and cart management

**Styles** (styles/)

- Global stylesheet
- Page-specific styling
- Layout and responsive design

## Data Management

### Browser Storage

This project uses localStorage to persist user data:

- Shopping cart contents
- Order history
- Session information

Data is serialized as JSON for storage and survives browser restarts.

### Data Flow

1. Products are loaded from the data module
2. User interactions trigger event listeners in scripts
3. Cart state is managed and stored in localStorage
4. Orders are created and persisted during checkout
5. Order pages fetch data from stored records

## Learning Outcomes

This project demonstrates proficiency in:

- DOM manipulation and event handling
- Modular JavaScript organization
- State management with localStorage
- HTML structure and semantic markup
- CSS styling and responsive layouts
- Multi-page application flow
- Data persistence and retrieval

## Future Enhancements

- Backend API integration (Node.js/Express)
- User authentication system
- Payment gateway integration
- Advanced product filtering and search
- User review and rating system
- Wishlist functionality
- Order status notifications

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Requires ES6 support

## Author

Francesco ([PhantomRuffy](github.com/PhantomRuffy))

---

For questions or feedback, please open an issue on the repository.

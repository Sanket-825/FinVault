# FinVault – Financial Dashboard

FinVault is a modern **personal finance dashboard** built with React that helps users track income, expenses, and financial insights through a clean and interactive interface. The project focuses on frontend architecture, reusable components, and professional UI/UX practices expected in production dashboards.

---

## Live Demo

Live URL:
https://sanket-825.github.io/FinVault/

Admin Access:
PIN: **1234**

---

## Features

### Financial Overview

* Total balance calculation
* Monthly income vs expense comparison
* Expense distribution visualization
* Spending insights panel
* Category based tracking

### Transaction Management

* Add transactions
* Delete transactions (Admin only)
* Edit transactions (Admin only)
* Search functionality
* Category filtering
* Sort by date, description, and amount
* Empty state handling

### Dashboard Experience

* Balance count-up animation
* Monthly bar growth animation
* Donut chart draw animation
* Smooth modal transitions
* Responsive layout
* Clean table hover interactions

### Role Based Access

* User mode (view only)
* Admin mode (edit access)
* PIN protected admin login
* Role persistence using localStorage

### Data Handling

* Mock data initialization
* LocalStorage persistence
* Automatic state updates
* Derived financial calculations

---

## Tech Stack

### Frontend

* React 19
* JavaScript (ES6+)
* Vite
* CSS3

### Libraries

* FontAwesome Icons

### State Management

* React Hooks
* useState
* useEffect

### Storage

* Browser LocalStorage

## Setup Instructions

### Clone repository

```
git clone https://github.com/sanket-825/FinVault.git
```

### Enter project

```
cd FinVault
```

### Install dependencies

```
npm install
```

### Run locally

```
npm run dev
```

### Build production version

```
npm run build
```

### Deploy

```
npm run deploy
```

---

## Approach & Architecture Decisions

### Component Design

The project follows a modular component architecture where UI is divided into independent reusable components like Dashboard, Transactions, Sidebar, and Insights.

### Styling Strategy

CSS was separated into logical files:

* Layout styling
* Component styling
* Utility classes
* Animation handling
* Responsive rules

This improves maintainability and scalability.

### Data Flow

Transactions are stored in localStorage and loaded into state. Financial insights are derived from this data instead of being stored separately.

Pattern used:

* Source data → transactions
* Derived data → totals and insights
* UI updates automatically

### Role Handling

Role management uses localStorage to persist admin or user state across refreshes.

Admin verification uses a simple PIN check for frontend demonstration purposes.

### Performance Considerations

* No heavy chart libraries used
* Custom CSS animations instead of large dependencies
* Minimal re-renders
* Lightweight SVG graphics

---

## Key UI Enhancements

Animations added to improve UX:

* Dashboard cards fade-in
* Monthly bars animate from bottom
* Donut chart stroke animation
* Balance number counter animation
* Modal scale transitions

## Security Notes

Current implementation is frontend only.

Admin protection is UI based and not secure for production use.

Production improvements would include:

* Backend authentication
* JWT authorization
* Database validation
* Secure API routes

---

## Future Improvements

Potential upgrades:

* Backend integration
* Authentication system
* CSV export
* PDF reports
* Budget goals
* Dark/light theme toggle
* Financial predictions
* Category budgets
* Multi-user support

---

## Learning Outcomes

This project demonstrates:

* React component architecture
* State management patterns
* Financial data modeling
* UI animation techniques
* Responsive dashboard design
* Role based UI logic
* Data driven rendering

---

## Author

Sanket Parab

GitHub:
https://github.com/sanket-825

---

## Notes

This project focuses on frontend engineering practices and UI architecture rather than backend implementation.

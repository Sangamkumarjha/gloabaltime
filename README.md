# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Globaltime Dashboard

This project is a React application built with Vite and Tailwind CSS that replicates the Globaltime Dashboard interface.

## Project Structure

```
globaltime-dashboard/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── logo.png
│   │   └── avatar.png
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── LinkCard.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── NavBar.jsx
│   │   └── GlobaltimeDashboard.jsx
│   ├── controllers/
│   │   ├── DashboardController.js
│   │   └── UserController.js
│   ├── models/
│   │   └── UserModel.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── DownloadPlan.jsx
│   │   ├── MatrixPage.jsx
│   │   ├── MyIncome.jsx
│   │   └── MyTeam.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## MVC Pattern Implementation

This application follows an MVC-like pattern:

### Models

- `UserModel.js`: Manages user data and interactions with the backend API.

### Views (Components)

- Components in `/components` directory represent the view layer
- Layout components handle the overall structure
- Dashboard components handle specific UI elements

### Controllers

- `UserController.js`: Controls user-related operations
- `DashboardController.js`: Controls dashboard-specific operations

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Features

- Dashboard overview with user statistics
- Profile information display
- Copy-to-clipboard functionality for links
- Responsive layout with Tailwind CSS
- Navigation between different sections

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- React Icons
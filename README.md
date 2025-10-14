# Chemistry-app

A chemistry application for calculating molecular formulas and retrieving chemical compound information. The application consists of a FastAPI backend for handling chemical calculations and a React frontend with TypeScript and Bootstrap for the user interface.

## Backend structure

Below is the directory structure for the backend portion of this project. Paths are relative to the repository root.

```
server/
	main.py
	chemistry_app.db
	app/
		config/
		controllers/
		data/
		models/
		routes/
		schemas/
		services/
		utils/
```

A short description of each folder:

- `main.py` — application entrypoint.
- `chemistry_app.db` — SQLite database for storing formula history.
- `config/` — configuration files and environment setup.
- `controllers/` — request handlers that orchestrate services and responses.
- `data/` — static data files like atomic masses.
- `models/` — data models and ORM schemas.
- `routes/` — route definitions that connect endpoints to controllers.
- `schemas/` — request/response validation schemas (e.g., Pydantic).
- `services/` — business logic and external integrations.
- `utils/` — helper utilities and common functions.

## Frontend structure

Below is the directory structure for the frontend portion of this project. The frontend follows the Atomic Design methodology for component organization.

```
client/
    public/
    src/
        assets/
        components/
            atoms/          # Smallest building blocks (buttons, inputs, etc.)
            molecules/      # Combinations of atoms (form groups, menu items, etc.)
            organisms/      # Larger components (forms, navigation bars, etc.)
            templates/      # Page layouts
        constants/          # Application constants and configuration
        context/            # React context definitions and providers
        hooks/              # Custom React hooks
        pages/              # Full page components
        services/           # API and external service interactions
        styles/             # Global styles and theme definitions
        types/              # TypeScript type definitions
        utils/              # Helper utilities and functions
        App.tsx             # Application root component
        index.tsx           # Application entry point
        routes.tsx          # Application routing definitions
```

A short description of key folders:

- `components/` — UI components organized by Atomic Design principles
  - `atoms/` — Basic UI elements (Button, Input, ErrorBoundary, etc.)
  - `molecules/` — Composite components (FormulaCard, SearchBar, etc.)
  - `organisms/` — Complex UI sections (FormulaForm, Navigation, etc.)
- `context/` — React context providers for state management
- `pages/` — Full page components that compose organisms and templates
- `services/` — API client and service integrations
- `styles/` — Global styles, theme configuration, and CSS modules

## Features

- **Chemical Formula Calculator**: Parse and analyze chemical formulas
- **Molecular Weight Calculation**: Calculate exact molecular weights
- **Element Composition**: View detailed breakdown of elements in compounds
- **Formula History**: Save and review past calculations
- **Chemical Information**: Retrieve detailed information about compounds via PubChem integration
- **Responsive UI**: Modern interface that works on both desktop and mobile devices

## How to run

### Backend

```bash
cd server
python -m uvicorn main:app --reload
```

### Frontend

```bash
cd client
npm install
npm start
```

## Technologies

### Backend

- **FastAPI**: High-performance Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation and settings management
- **PubChem API**: Integration for chemical information retrieval
- **SQLite**: Lightweight database for storage

### Frontend

- **React**: JavaScript library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Bootstrap**: CSS framework for responsive design
- **React Router**: Declarative routing for React
- **Context API**: State management solution
- **Axios**: HTTP client for API requests

## Project Architecture

This application follows a modern client-server architecture:

1. **Client-Side**:

   - Single Page Application (SPA) built with React
   - Component-based UI organized with Atomic Design
   - Context API for global state management
   - TypeScript for type safety and better developer experience

2. **Server-Side**:
   - RESTful API endpoints built with FastAPI
   - Service-oriented architecture for separation of concerns
   - Data persistence with SQLite and SQLAlchemy ORM
   - External service integration with PubChem API
3. **Communication**:
   - JSON-based API for data exchange
   - Asynchronous requests for improved performance
   - Error handling on both client and server

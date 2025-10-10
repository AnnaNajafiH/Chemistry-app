# Chemistry-app

A chemistry application for calculating molecular formulas and retrieving chemical compound information.

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

## How to run

```bash
cd server
python -m uvicorn main:app --reload
```

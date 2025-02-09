# Frontend for Notebook Application

This is the **frontend** portion of the Notebook Application, built using **React** with TailwindCSS for styling. The application supports SQL and NoSQL databases with a dynamic UI for managing notebooks and executing database queries.

## Features

- **Notebook Management**: Create, view, edit, delete, import, and export notebooks.
- **Query Execution**: Execute SQL/NoSQL queries with live results.
- **Database Schema Visualization**: View the schema of connected databases.
- **Dark Mode**: Switch between light and dark modes for a better user experience.
- **Markdown Support**: Write notes using Markdown with real-time rendering.
- **Resizable Panels**: Adjust the size of panels dynamically for better usability.

## Installation and Setup

### Local Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`.

### Using Docker

1. Build the Docker image:
   ```bash
   docker build -t frontend-service .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:80 frontend-service
   ```

### Using Docker Compose

1. Ensure you have the `docker-compose.yml` file in the parent directory.
2. Start the services:
   ```bash
   docker-compose up
   ```
3. The frontend will be available at `http://localhost:3000`.

## Project Structure

```
frontend/
├── public/              # Public assets
├── src/
│   ├── components/      # Reusable components (e.g., Navbar, DatabaseSchema, etc.)
│   ├── contexts/        # Context API for global state management
│   ├── modals/          # Modal components (e.g., DatabaseSettingsModal)
│   ├── pages/           # Page-level components (e.g., NotebooksList, NotebookEditor)
│   ├── styles/          # Global TailwindCSS configuration
│   ├── utils/           # Utility functions (e.g., database type checkers)
│   ├── App.js           # Main app entry point
│   ├── index.js         # Application entry point
│   └── ...              # Other files
```

## Key Components

### Navbar

- The navigation bar includes links to different pages, buttons for creating/importing/exporting notebooks, and a toggle for dark mode.

### NotebookEditor

- Provides a dynamic UI for editing notebooks.
- Includes features like adding/removing Markdown and SQL blocks.

### DatabaseSchema

- Displays the schema of the connected database.
- Handles SQL and NoSQL database schemas differently for better visualization.

### SqlBlock & MarkdownBlock

- **SqlBlock**: For executing database queries and viewing results dynamically.
- **MarkdownBlock**: Real-time Markdown editor with rendering.

## Customization

### Environment Variables

- Add environment variables in a `.env` file:
  ```env
  REACT_APP_API_URL=http://localhost:8000/api
  ```

### TailwindCSS

- Modify the `tailwind.config.js` file to customize styles.

### Dark Mode

- Implemented using the `dark` class on the root HTML element. You can adjust styles globally in `tailwind.config.js`.

## Scripts

- **Start Development Server**:
  ```bash
  npm start
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Linting**:
  ```bash
  npm run lint
  ```

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

# Vue Frontend Project

This project is a Vue.js frontend application designed to work in conjunction with a Symfony backend. It provides a user interface for interacting with the data and services provided by the Symfony API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)
- [Symfony CLI](https://symfony.com/download) (for running the Symfony backend)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/luciafalcinelli/carbon-intensity-frontend.git
    cd carbon-intensity-frontend
    ```

2. **Install Dependencies**

    Run the following command in the root directory of your project:

    ```bash
    npm install
    ```

3. **Environment Variables**

    Set up the `.env` file:

    - Create a `.env` file in the root directory.
    - Add the following line to the file:

      ```env
      VITE_APP_BASE_URL=https://127.0.0.1:8000
      ```

    Replace `https://127.0.0.1:8000` with the URL where your Symfony backend is running.

### Running the Application

#### Using Symfony CLI:

If you have Symfony CLI installed, you can start the backend application using:

```bash
symfony serve
```

#### Using Web Server:

Configure your web server to point to the `public` directory of the Symfony application. Access the application using the configured domain or IP address.

4. **Start the Development Server**

    ```bash
    npm run dev
    ```

    This will start the local development server for the Vue frontend. Usually, the app will be served at `http://localhost:3000`.

## Usage

After starting the development servers for both Vue frontend and Symfony backend, you can navigate to `http://localhost:3000` in your web browser to view the application.


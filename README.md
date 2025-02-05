# CaseBud Codebase

Welcome to the CaseBud codebase! This repository contains the source code for the CaseBud project, including the frontend, backend, model, and landing page applications.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Backend Setup](#backend-setup)
- [Model Setup](#model-setup)
- [Frontend Setup](#frontend-setup)
- [Landing Page Setup](#landing-page-setup)
- [Running the Applications](#running-the-applications)
- [API Documentation](#api-documentation)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Python (v3.8 or higher)
- pip (v20 or higher)
- MongoDB (v4.4 or higher)

## Environment Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/CaseBud/codebase.git
    cd codebase
    ```

2. Copy the example environment files and update them with your configuration:
    ```sh
    cp backend/.env.example backend/.env
    cp model/.env.example model/.env
    ```

## Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install the required npm packages:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm run dev
    ```

## Model Setup

1. Navigate to the model directory:
    ```sh
    cd model
    ```

2. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

3. Start the model server:
    ```sh
    uvicorn main:app --reload
    ```

## Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the required npm packages:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Landing Page Setup

1. Navigate to the landing page directory:
    ```sh
    cd landing-page
    ```

2. Install the required npm packages:
    ```sh
    npm install
    ```

3. Start the landing page development server:
    ```sh
    npm run dev
    ```

## Running the Applications

To run the applications, ensure that the backend, model, frontend, and landing page servers are all running simultaneously. You can access the applications via the following URLs:

- Backend API: `http://localhost:3000`
- Model API: `http://localhost:8000`
- Frontend: `http://localhost:3001`
- Landing Page: `http://localhost:3002`

## API Documentation

The backend API documentation is available at `http://localhost:3000/api-docs` once the backend server is running.

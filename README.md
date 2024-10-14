# Inventory Management System

This project is a simple inventory management system built with a Go backend and a React frontend. It allows users to manage items in an inventory, including adding, viewing, and removing items.

## Project Structure

/root-folder
├── web         # Frontend (React)
/core          # Backend (Go)

## Getting Started

### Prerequisites

- [Go](https://golang.org/dl/) (version 1.16 or later)
- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

#### Backend (Go)

1. Navigate to the `core` directory:
   ```bash
   cd core
   ```
2. Install the necessary Go dependencies
   ```bash
   go mod tidy
   ```
3. Start the Go Server
   ```bash
   go run main.go
   ```
    (The server will run on `http://localhost:8000`)

   

#### Frontend (React)

1. Navigate to the `web` directory:
   ```bash
   cd web
   ```
2. Install the necessary React dependencies
   ```bash
   npm i
   ```
   (or)
   ```bash
   yarn
   ```
4. Start the Vite React.JS Development server
   ```bash
   npm run dev 
   ```
   (or)
   ```bash
   yarn dev
   ```
    (The frontend will be accessible at `http://localhost:5173`)

   

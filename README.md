# Money Transfer App

A simulated money transfer application built with ASP.NET Core Web API, React, and MS SQL Server, fully containerized with Docker.

## Features
- View all accounts and their current balances
- View transaction history
- Transfer funds between accounts, with validation:
  - Insufficient balance is rejected
  - Account balances never go negative
  - All transfers are atomic (fully succeed or fully fail)

## Tech Stack
- **Backend:** ASP.NET Core Web API (.NET 10), Entity Framework Core
- **Database:** MS SQL Server
- **Frontend:** React (Vite)
- **Containerization:** Docker & Docker Compose

## Running the Project

The entire stack (API, frontend, and database) runs with a single command. No manual setup beyond Docker is required.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

### Steps
1. Clone this repository:
https://github.com/classysandman/proiacio_enagramm.git


2. Create a `.env` file in the project root (copy `.env.example`):
```
   cp .env.example .env
```
# Sweetie Bakery

A Full-Stack Bakery Menu and Order Management System.

## Authors

Hazem Algendy & Shuwen Luo

## Page Deployment Link

http://3.22.235.29:5173

## Class Link

https://northeastern.instructure.com/courses/245751

## Design Document

https://docs.google.com/document/d/1CukWKklPPVcqSHUShNHj-RulOKrdzGu_GBMLZSII6ig/edit?usp=sharing

## Project Objective

To build a full-stack web application using React (Vite), Node.js, Express, and MongoDB that helps a local bakery manage its menu and customer orders independently. The platform provides a public-facing interface for customers to browse offerings and place orders, alongside a secure, Passport.js-authenticated administrative dashboard for staff. The system is designed to handle a catalog of over 1,000 products and track incoming orders in real-time without relying on external CORS or Mongoose libraries.

## Screenshot

![Project Screenshot](./images/screenshot.png) 

## Slides

https://docs.google.com/presentation/d/1z1r2y2nH-nTADN2mbPylbIjRJRxy4EKsmX5LBqWwsJ0/edit?usp=sharing

## Demo Video

https://drive.google.com/file/d/1fCdSUfi8Q6imyE6mHBxMAcrutBganoox/view?usp=sharing

## Instructions to Build

This application is containerized using Docker for a seamless, self-contained environment.

### Prerequisites
* **Docker Desktop** installed and running.

### Setup Steps
1. Clone the repository: `git clone <repo-url>`
2. Navigate to the project folder: `cd sweetie-bakery-1` (or the folder name you cloned into)
3. Create a `.env` file in the project root (same folder as `compose.yaml`) with at least:
   - `MONGODB_URI=mongodb://mongodb:27017`
   - `DB_NAME=sweetie-bakery`
4. Build the images and start the containers:
   ```bash
   docker compose up --build
   ```
5. Open the app at `http://localhost:5173`. To load menu data, seed the database once:
   ```bash
   docker compose exec backend npm run seed
   ```

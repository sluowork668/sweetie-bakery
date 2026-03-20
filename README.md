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

[TODO: Insert Slides Link Here]

## Demo Video

https://youtu.be/N8TZKrlbDsQ

## Instructions to Build

This application is containerized using Docker for a seamless, self-contained environment.

### Prerequisites
* **Docker Desktop** installed and running.

### Setup Steps
1. Clone the repository: `git clone <repo-url>`
2. Navigate to the project folder: `cd sweetie-bakery`
3. Build the images and start the containers: 
   ```bash
   docker compose up --build

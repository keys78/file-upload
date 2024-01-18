# Project Name

File uploads
## Table of Contents

- [Project Description](#project-description)
- [Folder Structure](#folder-structure)
- [Controllers](#controllers)
- [Routes](#routes)
- [Installation](#installation)
- [Usage](#usage)
- [Bottlenecks](#bottlenecks)

## Project Description

A basic RESTful API for files service CRUD operations

## Folder Structure

- **dist**: Contains the built files.
- **src**: Contains the source code.
  - **controllers**: Houses the controller files.
  - **middlewares**: Middleware functions.
  - **models**: Data models for MongoDB or using mongoose.
  - **routes**: Defines the routes and connects them to controllers.
  - **utils**: Utility functions.

## Controllers


- **fileUpload.js**: Handles file uploads using Multer and Cloudinary.

## Routes


- **/v1/file**: 
  - `POST`: Upload a file.
  - `GET`: Get all files.
- **/v1/file/:id**: 
  - `GET`: Get a single file by ID.
  - `DELETE`: Delete a file by ID.

## Installation

Provide instructions on how to install and set up the project:

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables based on the instances of the environment keys used in the project.

## Usage

Explain how to use or run the project:

1. Start the server on dev: `npm run dev`
2. Open the application in your browser: `http://localhost:5000`

## Bottlenecks

- None

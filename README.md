# Assignment Tracker

## Description

**Assignment Tracker** is a React-based web application that helps users manage assignments effectively. It allows users to add, edit, and delete assignments with due dates, receive reminders for upcoming deadlines, and stay motivated with daily inspirational quotes.

## Problem Solved

Managing multiple assignments and keeping track of deadlines can be challenging. This application provides a structured way to manage assignments, ensuring that you never miss an upcoming due date while staying motivated with a daily quote.

## Features

- **Add, Edit, and Delete Assignments**: Users can create assignments with specific titles and due dates, edit them as needed, or remove them once completed.
- **Daily Motivational Quote**: The app displays an inspirational quote fetched from the Zen Quotes API to keep users motivated.
- **Due Date Reminders**: Users are notified when assignments are due within the next 24 hours, helping them stay on top of deadlines.
- **Progress Tracking**: Visual representation of time remaining for each assignment via progress bars.

## Project Setup

### Prerequisites

Ensure that Node.js and npm are installed on your system.

### Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MinseokKim0813/assignment-tracker.git
   cd assignment-tracker
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm start
   ```

The application will start at http://localhost:3000.

### Additional Dependencies

This project uses Material UI for UI components, which installs automatically with npm install. If you need to install it manually, you can use:

    ```bash
    npm install @mui/material @emotion/react @emotion/styled
    ```

## Usage

1. Add an Assignment: Use the form to input an assignment title and due date.
2. Edit or Delete an Assignment: Click "Edit" to modify assignment details, or "Delete" to remove it.
3. Receive Reminders: If an assignment is due within the next 24 hours, a reminder notification will appear.
4. Motivational Quote: A new motivational quote from the Zen Quotes API will appear each time you visit the app.

## API Integration

This app integrates with the Zen Quotes API to fetch a daily motivational quote, displayed prominently to inspire users as they manage their assignments.

## API Setup

The Zen Quotes API is accessed via allorigins.win, which fetches a quote from https://zenquotes.io/api/random and returns it in a CORS-friendly format. This is handled directly in the fetchQuote function within the code.

## AI Assistance

This project was developed with assistance from ChatGPT. The AI contributed to:

- Debugging the editing functionality for assignments.
- Structuring the application components.
- Setting up API integration for motivational quotes.
- General guidance on React best practices.

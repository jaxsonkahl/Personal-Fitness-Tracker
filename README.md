# Personal Workout Tracker

A web-based application to help users track exercises, workouts, and body weight over time. Users can add exercises, log workout details (reps, sets, weight), track body weight, and visualize progress with interactive graphs.

## Table of Contents
- [Features](#features)
- [Demonstration](#demonstration)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

## Features
- **Exercise Management**: Add, update, and delete exercises with descriptions.
- **Workout Logging**: Log workouts with details like date, reps, sets, and weight.
- **Body Weight Tracking**: Track body weight over time.
- **Progress Visualization**: Display interactive graphs for weight and body weight progress over a chosen date range.
- **User-Friendly UI**: Intuitive tab navigation for easy access to each feature.

## Demonstration

https://github.com/user-attachments/assets/e5125ded-18bb-45c1-a2c1-53a08d730764

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Libraries**:
  - [Chart.js](https://www.chartjs.org/) for data visualization
  - [Express](https://expressjs.com/) for server-side routing
  - [SQLite](https://www.sqlite.org/) for database management

## Setup and Installation

To get a local copy up and running, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) (v14+)
- [npm](https://www.npmjs.com/get-npm)
- [Visual Studio Code (VSCode)](https://code.visualstudio.com/) with the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/jaxsonkahl/Personal-Fitness-Tracker
   ```
2. **Navigate to the project directory**:
    ```bash
    cd personal-workout-tracker
    ```
3. **Install dependencies**:
    ```bash
    cd src/backend
    npm install
    ```
4. **Set up the Database**:
- Ensure your database is properly set up and configured.
- If using SQLite, make sure the database file (workout-tracker.db) is in the correct location

5. **Start the Backend Server**:

- While inside the src/backend directory, run:
    ```bash
    node app.js
    ```
- The backend API server should now be running at `http://localhost:3000`

6. **Open the Frontend with Live Server**:

- Open the project directory in VSCode.
- In the file explorer, navigate to `index.html` located in `src/frontend/` or wherever your `index.html` is.
- Right-click on `index.html` and select "Open with Live Server".
- The application should open in your default browser, typically at `http://127.0.0.1:5500` or similar.

7. **Configure API URL**:

- Since the frontend is served via Live Server, you need to ensure the frontend JavaScript (app.js) is pointing to the correct backend API URL.
- In your app.js file (located in `src/frontend/`), set the API_URL variable to `http://localhost:3000:` if it is not set up already

    ```
    const API_URL = 'http://localhost:3000';
    ```
## Usage
1. **Add Exercises**: Go to the "Add Exercises" tab, fill out the exercise name and description, and click "Add Exercise."
2. **Log Workouts**: Navigate to the "Add Workouts" tab, select an exercise, specify reps, sets, and weight, and click "Add Workout."
3. **Track Body Weight**: Go to the "Add Bodyweight" tab, enter the date and weight, then click "Add Body Weight."
4. **View Progress**: Head over to the "View Progress" tab, select an exercise, date range, and metric (Weight or Body Weight), then click "View Progress" to see an interactive graph.

## Project Structure
```
personal-workout-tracker/
│
├── src/
│   ├── backend/
│   │   ├── app.js               # Express server setup
│   │   ├── controllers/
│   │   │   └── exerciseController.js
│   │   ├── routes/
│   │   │   └── exerciseRoutes.js
│   │   ├── database.js          # Database connection setup
│   │   └── workout.db           # SQLite database file
│   └── frontend/
│       ├── index.html           # Main HTML file
│       ├── style.css            # CSS file
│       └── app.js               # JavaScript for frontend logic
├── README.md                    # Project documentation
└── package.json                 # Project metadata and dependencies
```

## Future Enhancements
- **User Authentication**: Allow users to create accounts and track personal data.
- **Progress Comparison**: Compare multiple exercises or metrics on the same graph.
- **Data Export**: Enable users to export workout data as CSV or PDF.
- **Mobile Compatibility**: Enhance the UI for mobile responsiveness.

## Contact
Created by Jaxson Kahl - feel free to connect!

LinkedIn: [Jaxson Kahl](https://www.linkedin.com/in/jaxson-kahl-b8b464269/)

Email: jaxsonkahl@gmail.com

***

### Additional Notes  
- **API Endpoints**: Since the frontend and backend are served separately, ensure all API calls from the frontend point to `http://localhost:3000`. 
- **CORS Configuration**: Your backend server should have CORS enabled to allow requests from the Live Server domain
    ```
    import cors from 'cors';
    app.use(cors());
    ```
- **Backend Server Not Running**: Verify that the backend server is running in the terminal and listening on the correct port (`3000`).

## Why Use Live Server?
- Using Live Server allows you to quickly serve your static frontend files without setting up additional configurations on your Express server. It's helpful during development for live reloading and easy testing.

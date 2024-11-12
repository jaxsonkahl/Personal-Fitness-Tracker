# Personal Workout Tracker

A web-based application to help users track exercises, workouts, and body weight over time. Users can add exercises, log workout details (reps, sets, weight), track body weight, and visualize progress with interactive graphs.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Exercise Management**: Add, update, and delete exercises with descriptions.
- **Workout Logging**: Log workouts with details like date, reps, sets, and weight.
- **Body Weight Tracking**: Track body weight over time.
- **Progress Visualization**: Display interactive graphs for weight and body weight progress over a chosen date range.
- **User-Friendly UI**: Intuitive tab navigation for easy access to each feature.

## Screenshots
![Main Interface](link-to-screenshot-main.png)
![Workout Logging](link-to-screenshot-workout.png)
![Progress Visualization](link-to-screenshot-progress.png)

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

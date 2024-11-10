# **Workout Tracker Application System Design Document**

## 1. **Architectural Overview**
   - **Architecture Type**: Single Page Application (SPA) with a client-server model
   - **Frontend**: Built using HTML, CSS, and JavaScript (framework options: React or vanilla JavaScript)
   - **Backend**: Node.js with Express or Python with Flask, serving as the API layer
   - **Database**: SQLite (ideal for local deployment due to its simplicity and lightweight nature)
   - **Data Visualization**: Chart.js or D3.js for rendering interactive graphs

### 1.1 **High-Level Diagram**
   - **Client Side**:
      - User interacts with forms, views workout history, and accesses visualizations
   - **Server Side**:
      - Handles requests from the client, communicates with the SQLite database, and performs CRUD operations
   - **Database**:
      - Stores workout entries, exercises, and body weight data for retrieval and analysis

   ![image](Images/Personal%20Fitness%20Tracker%20Architectural%20Design.jpeg)

## 2. **Database Schema (SQLite Implementation)**

   SQLite is ideal for local deployment as it is serverless, self-contained, and requires minimal setup. Here’s the schema adapted for SQLite:

### 2.1 **Tables and Attributes**

   #### **Exercises Table**
   - **SQL Command**:
     ```sql
     CREATE TABLE Exercises (
        exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
     );
     ```
   - **Description**: Stores unique exercises with optional descriptions

   #### **WorkoutLogs Table**
   - **SQL Command**:
     ```sql
     CREATE TABLE WorkoutLogs (
        log_id INTEGER PRIMARY KEY AUTOINCREMENT,
        exercise_id INTEGER,
        date TEXT NOT NULL,
        repetitions INTEGER NOT NULL,
        weight REAL NOT NULL,
        FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id)
     );
     ```
   - **Description**: Logs each workout entry, connecting to an exercise by `exercise_id`. Uses `REAL` type for weight to allow decimal precision.

   #### **BodyWeight Table**
   - **SQL Command**:
     ```sql
     CREATE TABLE BodyWeight (
        weight_id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        weight REAL NOT NULL
     );
     ```
   - **Description**: Records daily body weight with decimal precision.

### 2.2 **Entity-Relationship Diagram (ERD)**
   - *(Create an ERD to visualize relationships between tables, such as the connection between WorkoutLogs and Exercises, with SQLite-specific data types.)*

## 3. **API Design**
   - Define endpoints for managing workout and weight data

### 3.1 **API Endpoints**

   #### **Exercise Endpoints**
   - `POST /exercises`: Add a new exercise
   - `GET /exercises`: Retrieve all exercises
   - `GET /exercises/:id`: Retrieve a specific exercise by ID

   #### **Workout Log Endpoints**
   - `POST /workout-logs`: Log a new workout
   - `GET /workout-logs`: Retrieve all workout logs
   - `GET /workout-logs/:id`: Retrieve a specific workout log by ID

   #### **Body Weight Endpoints**
   - `POST /body-weight`: Log a new body weight entry
   - `GET /body-weight`: Retrieve all body weight entries

### 3.2 **Data Format**
   - Define JSON structure for requests and responses

   #### **Example: POST /workout-logs**
   ```json
   {
      "exercise_id": 1,
      "date": "2024-11-10",
      "repetitions": 10,
      "weight": 50.5
   }
   ```

## 4. User Interface (UI) Design
### 4.1 Wireframes

#### Workout Input Screen:

- **Fields**: Date, Exercise dropdown, Repetitions, Weight, Add another exercise button
- Submit button to save workout
#### Workout History Screen:

- **Display**: List of workouts, with expandable details for each exercise
- Filter option by date range or exercise type
#### Progress Visualization Screen:
- Graph options for exercise trends (repetitions and weight over time)
- Graph for body weight trend over time
(Include simple sketches or wireframes to visualize each screen)

### 4.2 UI Components

- **Header**: Navigation links to the Workout Input, Workout History, and Progress Visualization screens
- **Form Components**: Input fields for adding exercises, reps, and weight
- **Table/List View:** Organized display of past workouts
- **Charts:** Line or bar graphs for progress

## 5. Data Flow and Component Interaction
### Workflow for Logging Workouts:

- User submits a workout on the frontend
- Frontend sends a POST request to the backend
- Backend processes the request and updates the WorkoutLogs table in SQLite
- Response is sent back to the frontend, confirming data is saved

### Workflow for Viewing Progress:

- Frontend sends a GET request for workout logs or body weight data
- Backend retrieves the data from SQLite and sends it to the frontend
- Frontend visualizes the data using Chart.js or D3.js
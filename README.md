# Always Music v2 - Student Management System

This project is a Node.js application that interacts with a PostgreSQL database to manage student records for a music school. It includes functionalities to add, retrieve, update, and delete student records using asynchronous functions and connection pooling.

## Prerequisites

- Node.js installed on your machine
- PostgreSQL installed and running
- A PostgreSQL database and table created for storing student data

## Installation

1. Clone the repository to your local machine

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory of your project and add the following variables on `.env.example`

4. Create the PostgreSQL database and table. You can use the following SQL script to create the table:

    ```sql
    CREATE DATABASE always_music;

    \c always_music

    CREATE TABLE estudiantes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50),
        rut VARCHAR(10) UNIQUE,
        curso VARCHAR(50),
        nivel VARCHAR(20)
    );
    ```

## Usage

1. Run the application:

    ```bash
    node index.js <action> <rut> <nombre> <curso> <nivel>
    ```

    - `<action>`: The action to perform (`registrar`, `consultar`, `consultar_todos`, `actualizar`, `eliminar`).
    - `<rut>`: The student's RUT (required for all actions except `consultar_todos`).
    - `<nombre>`: The student's name (required for `registrar` and `actualizar` actions).
    - `<curso>`: The student's course (required for `registrar` and `actualizar` actions).
    - `<nivel>`: The student's level (required for `registrar` and `actualizar` actions).

2. Examples:

    - To add a new student:

        ```bash
        node index.js registrar 12345678-9 "Mandongo" "Guitar" "Intermediate"
        ```

    - To get a student by RUT:

        ```bash
        node index.js consultar 12345678-9
        ```

    - To get all students:

        ```bash
        node index.js consultar_todos
        ```

    - To update a student's data:

        ```bash
        node index.js actualizar 12345678-9 "Jujui" "Piano" "Advanced"
        ```

    - To delete a student:

        ```bash
        node index.js eliminar 12345678-9
        ```

## Functions

- `addStudent(nombre, rut, curso, nivel)`: Adds a new student to the database.
- `getStudentByRut(rut)`: Retrieves a student by their `rut`.
- `getAllStudents()`: Retrieves all students from the database.
- `updateStudent(rut, nombre, curso, nivel)`: Updates the details of a student identified by their `rut`.
- `deleteStudent(rut)`: Deletes a student from the database identified by their `rut`.

## Error Handling

The application uses prepared statements to prevent SQL injection and includes error handling to manage database query errors.

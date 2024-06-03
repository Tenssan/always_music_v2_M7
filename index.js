const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD_DB,
    port: process.env.DB_PORT,
});

// Function to add a new student
async function addStudent(nombre, rut, curso, nivel) {
    const query = {
        text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [nombre, rut, curso, nivel]
    }
    try {
        const res = await pool.query(query);
        console.log('Student added:', res.rows[0]);
    } catch (err) {
        console.error('Error adding student:', err);
    }
}

// Function to get a student by rut
async function getStudentByRut(rut) {
    const query = {
        text: 'SELECT * FROM estudiantes WHERE rut = $1',
        values: [rut]
    }
    try {
        const res = await pool.query(query);
        console.log('Student:', res.rows[0]);
    } catch (err) {
        console.error('Error getting student by rut:', err);
    }
}

// Function to get all estudiantes
async function getAllStudents() {
    const query = {
        text: 'SELECT * FROM estudiantes'
    }
    try {
        const res = await pool.query(query);
        console.log('estudiantes:', res.rows);
    } catch (err) {
        console.error('Error getting all estudiantes:', err);
    }
}

// Function to update a student's data
async function updateStudent(rut, nombre, curso, nivel) {
    const query = {
        text: 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *',
        values: [nombre, curso, nivel, rut]
    }
    try {
        const res = await pool.query(query);
        console.log('Student updated:', res.rows[0]);
    } catch (err) {
        console.error('Error updating student:', err);
    }
}

// Function to delete a student
async function deleteStudent(rut) {
    const query = {
        text: 'DELETE FROM estudiantes WHERE rut = $1 RETURNING *',
        values: [rut]
    }
    try {
        const res = await pool.query(query);
        console.log('Student deleted:', res.rows[0]);
    } catch (err) {
        console.error('Error deleting student:', err);
    }
}

// Get command-line arguments
const action = process.argv[2];
const rut = process.argv[3];
const name = process.argv[4];
const course = process.argv[5];
const level = process.argv[6];

// Execute the corresponding function based on the action
(async () => {
    switch(action) {
        case 'registrar':
            await addStudent(name, rut, course, level);
            break;
        case 'consultar':
            await getStudentByRut(rut);
            break;
        case 'consultar_todos':
            await getAllStudents();
            break;
        case 'actualizar':
            await updateStudent(rut, name, course, level);
            break;
        case 'eliminar':
            await deleteStudent(rut);
            break;
        default:
            console.log('Invalid action. Use registrar, consultar, consultar_todos, actualizar, or eliminar.');
    }
    pool.end();
})();
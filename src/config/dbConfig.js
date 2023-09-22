const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV);
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: false }); /*{ force: true} per forzare la sincronizzazione solo in fase di sviluppo
                                                       passare a false in produzione per evitare DANNI */
        console.log('Database sincronizzato');
    } catch (error) {
        console.error('Errore durante la sincronizzazione del database:', error);
    }
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importazione di tutti i modelli
const Course = require("../models/Course.js");
Course.initModel(sequelize);
db.course = Course;

const Enrollment = require("../models/Enrollment.js");
Enrollment.initModel(sequelize);
db.enrollment = Enrollment;

const Instructor = require("../models/Instructor.js");
Instructor.initModel(sequelize);
db.instructor = Instructor;

const Student = require("../models/Student.js");
Student.initModel(sequelize);
db.student = Student;

// Associazioni tra i modelli
// Un corso appartiene a un singolo istruttore "uno a molti"
// La chiave 'instructorId' nel modello 'Course' fa riferimento all'ID dell'istruttore.
db.course.belongsTo(db.instructor, { foreignKey: 'instructorId' });

// Un istruttore può tenere molti corsi "molti a uno".
// La chiave 'instructorId' nel modello 'Course' fa riferimento all'ID dell'istruttore.
db.instructor.hasMany(db.course, { foreignKey: 'instructorId' });

// Gli studenti possono iscriversi a molti corsi e un singolo corso può avere molti studenti."molti a molti".
// È la tabella 'Enrollment' agisce come intermediario e usata per gestire questa relazione.
// L'ID dello studente e l'ID del corso sono utilizzati come chiavi esterne nella tabella 'Enrollment', per creare questa relazione.
db.student.belongsToMany(db.course, { through: db.enrollment, foreignKey: 'studentId' });

// Questa associazione indica che un corso può avere molti studenti iscritti "molti a molti".
// Anche qui, la tabella 'Enrollment' viene utilizzata come tabella ponte.
db.course.belongsToMany(db.student, { through: db.enrollment, foreignKey: 'courseId' });


module.exports = {
    connect,
    db,
    syncDatabase
};

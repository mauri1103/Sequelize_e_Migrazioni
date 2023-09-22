const  Student  = require('../models/Student');
const { Op } = require('sequelize');

const findAllByFilter = async (req, res) => {
    try {
        const students = await Student.findAll({
            where: {
                points: {
                    [Op.between]: [50, 450]
                }
            }
        });

        if (students.length === 0) {
            return res.status(404).json({ message: "Non sono presenti studenti con il valore selezionato" });
        }

        res.json(students);

        /*RESPONSE:
        *
        *
        *
        *
        *  [
            {
                "studentId": 4,
                "firstName": "Student3",
                "lastName": "Student3",
                "email": "student3@example.com",
                "points": 321
            },
            {
                "studentId": 6,
                "firstName": "Student5",
                "lastName": "Student5",
                "email": "student5@example.com",
                "points": 78
            },
            {
                "studentId": 7,
                "firstName": "Student6",
                "lastName": "Student6",
                "email": "student6@example.com",
                "points": 202
            },
            {
                "studentId": 10,
                "firstName": "Student9",
                "lastName": "Student9",
                "email": "student9@example.com",
                "points": 322
            }
        ]
        * */




    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" + error || error.message || error.stack });
    }
}

module.exports = {
    findAllByFilter
};
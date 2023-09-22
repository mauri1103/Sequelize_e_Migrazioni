const {DataTypes, Model} = require('sequelize');

// Modello/ tabella di associazione tra studenti e corsi
class Enrollment extends Model {
    static initModel(sequelize) {
        super.init({
            studentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Students',
                    key: 'studentId'
                }
            },
            courseId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Courses',
                    key: 'courseId'
                }
            }
        }, {
            sequelize,
            modelName: 'Enrollment',
            timestamps: false
        });
    }
}

module.exports = Enrollment;

const {DataTypes, Model} = require('sequelize');

class Student extends Model {
    static initModel(sequelize) {
        super.init({
            studentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            points: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        }, {
            sequelize,
            modelName: 'Student',
            timestamps: false
        });
    }
}

module.exports = Student;
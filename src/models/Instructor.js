const {Model, DataTypes} = require('sequelize');

class Instructor extends Model {
    static initModel(sequelize) {
        super.init({
            instructorId: {
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
            }
        }, {
            sequelize,
            modelName: 'Instructor',
            timestamps: false
        });
    }
}

module.exports = Instructor;
const {Model, DataTypes} = require('sequelize');

class Course extends Model {
    static initModel(sequelize) {
        super.init({
            courseId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Course',
            timestamps: false
        });
    }
}

module.exports = Course;
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Movie extends Model {}

Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    type: DataTypes.STRING,
    imdbID: DataTypes.STRING
}, { sequelize, modelName: "movie" });

module.exports = Movie;
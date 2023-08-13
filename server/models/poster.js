const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Movie = require("./movie");

class Poster extends Model {}

Poster.init({
    url: DataTypes.STRING,
    movieId: {
        type: DataTypes.INTEGER,
        references: {
            model: "movies",
            key: "id",
        },
    },
}, { sequelize, modelName: "poster" });

Movie.hasMany(Poster, { foreignKey: "movieId" });
Poster.belongsTo(Movie, { foreignKey: "movieId" });

module.exports = Poster;
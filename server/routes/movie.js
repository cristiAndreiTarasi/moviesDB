require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Movie = require("../models/movie");
const Poster = require("../models/poster");

/* GET home page. */
router.get('/:title', async (req, res, next) => {
    try {
        const title = req.params.title;
        const response = await axios.get(`http://www.omdbapi.com/?s=${title}&apiKey=${process.env.OMDB_API_KEY}`);

        if (response.status !== 200) {
            throw new Error(`OMDB API responded with status code: ${response.status}`);
        }

        if (!response.data.Search) {
            throw new Error("Failed to fetch movie data.");
        }          
        
        const movies = response.data.Search;

        for (const movie of movies) {
            const [movieInstance, created] = await Movie.findOrCreate({
                where: { imdbID: movie.imdbID },
                defaults: {
                    title: movie.Title,
                    year: movie.Year,
                    type: movie.Type,
                    imdbID: movie.imdbID
                }
            });

            if (movie.Poster !== "N/A") {
                await Poster.findOrCreate({
                    where: { movieId: movieInstance.id },
                    defaults: { url: movie.Poster }
                });
            }
        }

        res.json({
            success: true,
            message: "Got the data and stored it successfully.",
            data: movies,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
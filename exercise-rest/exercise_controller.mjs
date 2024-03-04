import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise_model.mjs';

const app = express();

const PORT = process.env.PORT;

//movies.createMovie("Sorry to Bother You", 2018, "English");

app.use(express.json());
/**
 * Create a new exercise with some propertises provided in the body
 */


app.post('/exercises', (req, res) => {
    // movies.createMovie
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            //console.log(isDateValid(req.body.date) === false)
            //if (req.body.name.length > 0 && req.body.reps > 0 && req.body.weight > 0 && (req.body.unit === 'kgs'|| 'lbs') && isDateValid(req.body.date) === true) {
            res.status(201).json(exercise);

        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Invalid request'});
        });
});

/**
 * 전체 collection을 포함한 json 배열
 */
app.get('/exercises', (req, res) => {
    // * filter => {} 로 대체 
    exercises.findExercises({}, '', 0)
        .then(exercises => {
            res.status(200).send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    //console.log(movieId); //62971661a61c9106d7d10974
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
        .catch(error => {
            console.error(error);
            res.json({ Error: 'Request failed' });
        });
});

/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
 app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid request' });
        });
});
/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
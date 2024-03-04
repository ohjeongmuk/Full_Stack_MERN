import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


// HomePage에는 2개의 Props가 포함되어있다. 하지만 Actually we do not need to use movieToEdit
function HomePage({exerciseToEdit, setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();


    // 어차피 이벤트가 발생하는 곳은 homePage 이다. => Edit, Delete
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        // response 역시 return promise 
        const exercises = await response.json();
        setExercises(exercises);
    }

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newExercises = exercises.filter(m => m._id !== _id );
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    };
    
    // 무조건 한번은 이것을 불러와야한다
    useEffect(() => {
        loadExercises();
    }, []);
	
    // 어떻게 movie 객체를 홈페이지 -> EditMoviePage로 이동시킬까?
    //  App.js => const [movieToEdit, setMovieToEdit] = useState([]);

    // Notification: onEdit함수를 '누가 쓰고' 그리고 '어디에서 구동되는지' 확인해보자
    // onEdit 함수를 사용할려면 분명히 쓰는 누군가가 파라미터를 넘겨줄것이다! (movie)
    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit} ></ExerciseList>
            <Link to="/create-exercise">Create a exercise</Link>
        </>
    );
}

export default HomePage;
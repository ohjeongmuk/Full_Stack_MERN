import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


// setMovieToEdit은 불러오지 않았다. 왜냐하면 이것은 homepage 내에서 call 되기 때문이다. 삭제가능
export const EditMoviePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const getUnit = (event) => {
        setUnit(event.target.value);
    }

    // movieToEdit에는 Movie에서 클릭한 변수의 movie 객체가 들어있다!
    // Step1: Movie.js에서 클릭된 행의 movie가 onclick={onEdit}의 이벤트를 발생시킴
    // Step2: setMovieToEdit에서 클릭한 movie 객체로 업데이트한다 => movieToEdit = 클릭한 movie의 객체
    // Step3: movieToEdit(movie) 객체를 App.js ->EditMoviePage 로 이동시킴

    // Step4: EditMoviePage 내에서 movieToEdit.id로 reponse 변수에 할당
    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            // app.put의 req에는 edtiedMovie의 정보가 들어있다!
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise, status code =${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <input
                type="text"
                placeholder="Name to be edited"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Reps to be edited"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight to be edited"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select name="unit" value={unit} onChange={getUnit}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="text"
                placeholder="Date to be edited"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditMoviePage;
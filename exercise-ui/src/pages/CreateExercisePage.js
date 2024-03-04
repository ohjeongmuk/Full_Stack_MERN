import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const getUnit = (event) => {
        setUnit(event.target.value)
    }

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            
            method: 'POST',
            // javascript 객체 영화를 문자열로 변환하기 위해서 JSON.stringify로 호출
            body: JSON.stringify(newExercise),

            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully created the exercise");
        } else {
            alert(`Failed to create exercise, status code = ${response.status}`);
        }
        history.push("/");
    };
/*             <input
                type="text"
                value={unit}
                placeholder="Exercise unit"
                onChange={e => setUnit(e.target.value)} />

*/

    return (
        <div>
            <h1>Create Exercise</h1>
            <input
                type="text"
                placeholder="Exercise name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Exercise reps"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Exercise weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select name="unit" value={unit} onChange={getUnit}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="text"
                placeholder="Exercise date"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Create</button>
        </div>
    );
}

export default CreateExercisePage;
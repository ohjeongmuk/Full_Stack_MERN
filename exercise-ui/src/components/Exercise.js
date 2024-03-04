import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {

    // 이벤트가 발생하는 곳은 여기다! 그래서 onEdit과 onDelete에서 매개변수를 보내주고있다.
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick ={()=> onEdit(exercise)} /></td>
            <td><MdDeleteForever onClick={()=> onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;

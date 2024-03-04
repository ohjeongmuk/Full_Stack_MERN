import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  //setMovieToEdit 함수의 매개변수는 Movie파일 안에 있는 onEdit()함수에 movie가 매개변수로 보내짐
  //const [name, setName] = useState('');

  // We can notice that we are passing two properties to each Pages (Homepage, EditMoviesPage)
  // So we still need to check there are props as parameters in pages
  // 밑에 프로퍼티 보내는거 확인했으니, 이제는 각 페이지에서 props 있는지 확인해라
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage exerciseToEdit = {exerciseToEdit} setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit = {exerciseToEdit} setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          </div>
      </Router>
    </div>
  );
}

export default App;
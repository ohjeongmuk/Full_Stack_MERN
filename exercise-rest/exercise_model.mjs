import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true , useUnifiedTopology: true}
);

const db = mongoose.connection;

//Schema
const exerciseSchema = mongoose.Schema ({
    name: { type: String, required: true}, // required: 자료를 찾을 때 무조건 필요함
    reps: { type: Number, required: true},
    weight: { type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
    
});

//Models
const Exercise = mongoose.model("Exercise", exerciseSchema);

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

//function: return promise
const createExercise = async (name, reps, weight, unit, date) => {
    let exercise = undefined
    if (name.length > 0 && reps > 0 && weight > 0 && ((unit === 'kgs')||(unit ==='lbs')) && isDateValid(date) === true){
        exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    }
    return exercise.save(); // promise! 
} 

// replace: 기존의 json데이터를 update해보자
const replaceExercise = async(_id, name, reps, weight, unit, date) => {
    //replaceOne 은 기존 메서드 return 'the numnber modified'
    let result = undefined
    if (name.length > 0 && reps > 0 && weight > 0 && ((unit === 'kgs')||(unit ==='lbs')) && isDateValid(date) === true){
        result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    }
    return result.modifiedCount;
};

/*******************/
const findExercises = async(filter, projection, limit) => {
    //find는 filter 와 일치하는 movie만 찾아낸다
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}
// filer make specifies
const findExerciseById = async (_id) => {
    //findById는 기존에 존재하는 메서드 return null or one value
    const query = Exercise.findById(_id)
    //console.log(query.exec());
    // 리턴 값으로 넘기기 위해서 exec()를 사용한다 // 비동기인것을 동기로 바꿔줌
    return query.exec();    
}
/********************/



const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//user (collect) & database (users_db)

//mongoose.set("useCreateIndex", true);
export {createExercise, findExerciseById, replaceExercise, findExercises, deleteById};
//http://localhost:3000/create?title=Sorry%20to%20Bother%20you&year=2018&language=English

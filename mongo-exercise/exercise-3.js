const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then( () => console.log('Connected...') )
    .catch( error => console.log('Error', error.message ) );

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: { type: Date, default: Date.now() },
    tags: [ String ],
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model( 'Course', courseSchema );

async function getAllCourses() {

    return await Course
        .find( { isPublished: true } )
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .sort( { price: -1 } )
        .select( 'name author price isPublished' );

}

/*
getAllCourses()
    .then( (courses) => console.log(courses) );
*/

async function run() {
    const courses = await getAllCourses();
    console.log(courses);
}

run();
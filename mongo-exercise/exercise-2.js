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

    return await Course.find( { tags: { $in: [ 'backend', 'frontend' ] }, isPublished: true } )
        .sort( { price: -1 } )
        .select( { name: 1, author: 1 } );

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
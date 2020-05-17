/**
 * Created by jorgefosela on 4/5/20.
 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then( () => console.log('Connected...') )
  .catch( err => console.error('Could not connect', err) );


const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model( 'Course', courseSchema );

async function createCourse() {
  const course = new Course({
    name: 'React JS',
    author: 'Mosh',
    tags: ['React', 'frontend'],
    isPublished: true
  });

  const result = await course.save();

  console.log( result );
}

async function getCourses() {

  const courses = await Course
    .find( { author: 'Mosh', isPublished: true } )
    .limit(10)
    .sort( { name: 1 } )
    .select( { name: 1, tags: 1 } );
  console.log('Estos son los cursos ', courses);

}

async function updateCourse(id) {

  const result = await Course.update( 
    { _id: id }, 
    {
      $set : { date: Date.now() }
    }
  );

  console.log(result)
}

updateCourse('5eafb411a071731e9b5f8e23');
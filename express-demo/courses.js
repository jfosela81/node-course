/**
 * Created by jorgefosela on 22/4/20.
 */
  /*
  Just for practicing concepts
   */

const courses = [
  {
    id: 1,
    name: "course 1"
  },
  {
    id: 2,
    name: "course 2"
  },
  {
    id: 3,
    name: "course 3"
  },
  {
    id: 4,
    name: "course 4"
  }
];

const course_found = courses.find( (course, index) => {
  console.log(index);
  return course.name === 'course 2'
} );

console.log( course_found.name );